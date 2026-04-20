"use client";
import { useEffect } from "react";
import {
  CheckCircle2,
  Calendar,
  MonitorPlay,
  MessageCircle,
} from "lucide-react";

export default function SuccessPage() {
  useEffect(() => {
    const orderId = new URLSearchParams(window.location.search).get("order_id");

    fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 px-4 sm:px-6 py-12">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/40 border border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
        {/* Top Decorative Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>

        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
            Payment Successful
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Your seat is secured! You are officially registered for the
            masterclass.
          </p>

          {/* Event Details "Ticket" */}
          <div className="w-full bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl p-5 mb-8 border border-zinc-100 dark:border-zinc-800 text-left">
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
              Event Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start text-zinc-700 dark:text-zinc-300">
                <Calendar className="h-5 w-5 mr-3 text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">May 1, 2026</p>
                  <p className="text-xs text-zinc-500 mt-0.5">6:00 PM IST</p>
                </div>
              </div>
              <div className="flex items-start text-zinc-700 dark:text-zinc-300">
                <MonitorPlay className="h-5 w-5 mr-3 text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Live Online</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Link will be shared via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action */}
          <a
            href="https://chat.whatsapp.com/YOUR_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-xl font-medium transition-all duration-200 shadow-sm shadow-emerald-600/20 active:scale-[0.98]">
            <MessageCircle className="h-5 w-5 mr-2" />
            Join WhatsApp Group
          </a>

          <p className="text-xs text-zinc-400 mt-6">
            We’ve also sent your receipt and details to your WhatsApp number.
          </p>
        </div>
      </div>
    </section>
  );
}
