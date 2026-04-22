import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, amount } = await req.json();

    const orderId = "order_" + Date.now();

    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID || "",
        "x-client-secret": process.env.CASHFREE_SECRET_KEY || "",
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_" + Date.now(),
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
        },
        order_meta: {
          return_url: `https://master-class-sigma.vercel.app/payment-success?order_id=${orderId}`,
        },
      }),
    });

    const data = await response.json();

    // store order_id in supabase
    await supabase
      .from("leads")
      .update({ order_id: orderId })
      .eq("email", email);

    return Response.json({
      payment_session_id: data.payment_session_id,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Order failed" });
  }
}
