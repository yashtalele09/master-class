import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!,
);

cashfree.XApiVersion = "2023-08-01";

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();

  try {
    const response = await cashfree.PGFetchOrder(orderId);
    const order = response.data;

    console.log("Cashfree Order:", order);

    if (order.order_status === "PAID" || order.order_status === "SUCCESS") {
      /* ── GET USER DATA ── */
      const { data: lead } = await supabase
        .from("leads")
        .select("full_name, whatsapp, payment_status")
        .eq("order_id", orderId)
        .single();

      if (!lead) {
        return Response.json({ success: false });
      }

      /* ── PREVENT DUPLICATE MESSAGE ── */
      if (lead.payment_status === "paid") {
        return Response.json({ success: true });
      }

      /* ── UPDATE DB ── */
      await supabase
        .from("leads")
        .update({ payment_status: "paid" })
        .eq("order_id", orderId);

      /* ── SEND WHATSAPP HERE ✅ ── */
      try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID!;
        const authToken = process.env.TWILIO_AUTH_TOKEN!;

        const credentials = Buffer.from(`${accountSid}:${authToken}`).toString(
          "base64",
        );

        await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${credentials}`,
            },
            body: new URLSearchParams({
              From: "whatsapp:+14155238886",
              To: `whatsapp:+91${lead.whatsapp}`,
              Body: `Hey ${lead.full_name} 👋

✅ Payment received successfully!

🎉 Your seat for the Masterclass is confirmed.

See you inside 🚀`,
            }),
          },
        );
      } catch (waErr) {
        console.error("WhatsApp Error:", waErr);
      }

      return Response.json({ success: true });
    }

    return Response.json({ success: false });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return Response.json({ success: false });
  }
}
