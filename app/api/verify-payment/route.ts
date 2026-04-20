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
      const { error } = await supabase
        .from("leads")
        .update({ payment_status: "paid" })
        .eq("order_id", orderId);

      if (error) {
        console.log("Supabase error:", error);
      }

      return Response.json({ success: true });
    }

    return Response.json({ success: false });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return Response.json({ success: false });
  }
}
