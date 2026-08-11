"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Loader2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

const ACCOUNT_NUMBER = "0000000000";

const MobilePaymentPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const copyAccountNumber = async () => {
    await navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sessionId) return;

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);

      const channel = supabase.channel(`checkout-${sessionId}`);

      await channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.send({
            type: "broadcast",
            event: "receipt-uploaded",
            payload: { url },
          });
          setUploaded(true);
        }
      });
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  if (!sessionId) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center text-sm text-gray-500">
        This link is invalid or has expired. Please scan the QR code again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h1 className="font-display text-2xl font-bold text-near-black">
        Complete Your Payment
      </h1>

      <p className="mt-2 text-sm text-[#777]">
        Transfer to the account below, then upload your receipt.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-off-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-[#999]">Account Number</span>
          <button
            type="button"
            onClick={copyAccountNumber}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#927f04]"
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

        <p className="font-mono text-xl font-bold tracking-[0.15em] text-near-black">
          {ACCOUNT_NUMBER}
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-[#927f04]/20 bg-[#927f04]/10 p-4">
        <p className="text-xs leading-6 text-[#666]">
          After transferring, upload your receipt below — it will sync back
          to your original checkout automatically.
        </p>
      </div>

      <div className="mt-6">
        {uploaded ? (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-8 text-emerald-600">
            <Check size={20} />
            <span className="text-sm font-semibold">
              Receipt sent — you can close this page
            </span>
          </div>
        ) : (
          <>
            <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-500">
              {uploading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Upload size={20} />
                  Upload Receipt
                </>
              )}
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                disabled={uploading}
                onChange={handleFileChange}
              />
            </label>

            {uploading && (
              <p className="mt-3 text-center text-xs font-medium text-[#927f04]">
                Please don't close this window while we process your receipt...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobilePaymentPage;