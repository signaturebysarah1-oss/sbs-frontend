"use client";

import { Check, Copy, Smartphone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/lib/supabase";

const ACCOUNT_NUMBER = "0000000000";

interface Props {
  onReceiptReceived: (url: string) => void;
}

const CheckoutPayment = ({ onReceiptReceived }: Props) => {
  const [copied, setCopied] = useState(false);
  const [receivedFromPhone, setReceivedFromPhone] = useState(false);

  const sessionId = useMemo(() => crypto.randomUUID(), []);

  const mobilePayUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/checkout/mobile-pay?session=${sessionId}`
      : "";

  useEffect(() => {
    const channel = supabase
      .channel(`checkout-${sessionId}`)
      .on("broadcast", { event: "receipt-uploaded" }, (payload) => {
        const url = payload.payload?.url;
        if (url) {
          onReceiptReceived(url);
          setReceivedFromPhone(true);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, onReceiptReceived]);

  const copyAccountNumber = async () => {
    await navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="rounded-[24px] bg-near-black p-7 lg:p-9">
      <div className="mb-8 flex items-start gap-5">
        <span className="font-display text-4xl font-bold leading-none text-[#927f04]">
          04
        </span>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/60">
            Payment
          </p>

          <h2 className="mt-1 font-display text-2xl font-bold text-white">
            Make Your Payment
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/50">
            Transfer your payment using the account details below.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
          Bank Transfer Details
        </p>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4">
            <span className="text-xs text-white/40">Bank Name</span>
            <span className="text-right text-sm font-semibold text-white">Example Bank</span>
          </div>

          <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4">
            <span className="text-xs text-white/40">Account Name</span>
            <span className="max-w-[60%] text-right text-sm font-semibold text-white">
              Signature by Sarah Global Service Nigeria Limited
            </span>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-white/40">Account Number</span>

              <button
                type="button"
                onClick={copyAccountNumber}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold transition hover:text-white"
              >
                {copied ? (
                  <>
                    <Check size={13} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copy
                  </>
                )}
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="font-mono text-xl font-bold tracking-[0.15em] text-gold">
                {ACCOUNT_NUMBER}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <div className="flex items-center gap-2 text-white/40">
          <Smartphone size={14} />
          <p className="text-[10px] font-bold uppercase tracking-[0.16em]">
            Pay or Upload From Your Phone
          </p>
        </div>

        <p className="mt-2 text-xs leading-6 text-white/50">
          Scan this code to open the payment details and receipt upload on
          another device — it'll sync back here automatically.
        </p>

        <div className="mt-5 flex flex-col items-center gap-3">
          {receivedFromPhone ? (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-8 text-emerald-400">
              <Check size={18} />
              <span className="text-sm font-semibold">Receipt received from your device</span>
            </div>
          ) : (
            mobilePayUrl && (
              <div className="rounded-xl bg-white p-4">
                <QRCodeSVG value={mobilePayUrl} size={160} />
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-gold/20 bg-gold/10 p-4">
        <p className="text-xs leading-6 text-white/70">
          Please make your payment before submitting your order and upload
          your receipt or other payment evidence in the section below.
        </p>
      </div>
    </section>
  );
};

export default CheckoutPayment;