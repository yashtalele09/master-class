import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, whatsapp, city, source } = body;

    // 1. SAVE TO SUPABASE FIRST
    const { error } = await supabase.from("leads").insert([
      {
        full_name: name,
        email,
        whatsapp,
        city,
        source,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 },
      );
    }

    // 2. SEND WHATSAPP ONLY IF DB SUCCESS
    try {
      const whatsappRes = await fetch(
        process.env.WHATSAPP_API_URL ||
          "https://YOUR_WHATSAPP_PROVIDER_API/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          },
          body: JSON.stringify({
            to: `91${whatsapp}`,
            type: "text",
            message: `Hi ${name} 👋

You're successfully registered for our Masterclass 🚀

📅 Date: Coming Soon  
🎯 Check your email for joining details  

Reply YES if you want early access material.`,
          }),
        },
      );

      // optional: log failure but don't break flow
      if (!whatsappRes.ok) {
        console.error("WhatsApp failed");
      }
    } catch (waErr) {
      console.error("WhatsApp Error:", waErr);
    }

    // 3. FINAL RESPONSE
    return NextResponse.json(
      { success: true, message: "Lead saved successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
