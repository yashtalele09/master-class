import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

/* ── Supabase Client ── */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

/* ── POST API ── */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, whatsapp, city, source } = body;

    /* ── VALIDATION ── */
    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    if (!/^[6-9]\d{9}$/.test(whatsapp)) {
      return NextResponse.json(
        { success: false, message: "Invalid WhatsApp number" },
        { status: 400 },
      );
    }

    /* ── CHECK DUPLICATE (SAFE) ── */
    const { data: existing, error: fetchError } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
    }

    if (existing) {
      return NextResponse.json(
        {
          success: true,
          message: "You are already registered 👍",
        },
        { status: 200 },
      );
    }

    /* ── INSERT LEAD ── */
    const { error: insertError } = await supabase.from("leads").insert([
      {
        full_name: name,
        email,
        whatsapp,
        city,
        source,
        payment_status: "pending", // ✅ important
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);

      return NextResponse.json(
        {
          success: false,
          message: insertError.message,
        },
        { status: 500 },
      );
    }

    /* ── WHATSAPP MESSAGE (OPTIONAL SAFE) ── */
    try {
      if (process.env.WHATSAPP_API_URL && process.env.WHATSAPP_API_KEY) {
        await fetch(process.env.WHATSAPP_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          },
          body: JSON.stringify({
            to: `91${whatsapp}`,
            type: "text",
            message: `Hey ${name} 👋

You're successfully registered for the Masterclass 🚀

👉 Complete your payment to confirm your seat:
${process.env.NEXT_PUBLIC_SITE_URL}/pay

See you inside 🔥`,
          }),
        });
      }
    } catch (waErr) {
      console.error("WhatsApp Error:", waErr);
      // ❌ don't fail API if WhatsApp fails
    }

    /* ── SUCCESS RESPONSE ── */
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful 🎉",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Server Error:", err);
    const error = err as Error;

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
