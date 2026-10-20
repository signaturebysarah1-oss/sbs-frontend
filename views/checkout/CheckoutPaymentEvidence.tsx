"use client";

import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { CheckCircle2, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

const CheckoutPaymentEvidence = ({
  value,
  onChange,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (file: File) => {
    setError("");
    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (error) {
      console.error(error);
      setError("Payment evidence upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="rounded-[24px] border border-border bg-white p-7 lg:p-9">
      <div className="mb-8 flex items-start gap-5">
        <span className="font-display text-4xl font-bold leading-none text-[#927f04]">
          05
        </span>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
            Verification
          </p>

          <h2 className="mt-1 font-display text-2xl font-bold text-near-black">
            Payment Evidence
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#888]">
            Upload your receipt, transfer confirmation, screenshot, or any
            other evidence showing that payment has been made.
          </p>
        </div>
      </div>

      {!value ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-off-white p-10 text-center transition hover:border-gold">
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleUpload(file);
              }
            }}
          />

          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-gold" />

              <p className="mt-4 text-sm font-semibold text-near-black">
                Uploading payment evidence...
              </p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-[#999]" />

              <p className="mt-4 text-sm font-semibold text-near-black">
                Upload Payment Evidence
              </p>

              <p className="mt-1 text-xs text-[#999]">
                Receipt, screenshot, transfer confirmation or PDF
              </p>
            </>
          )}
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" size={22} />

            <div>
              <p className="text-sm font-semibold text-green-800">
                Payment evidence uploaded
              </p>

              <p className="mt-1 text-xs text-green-700">
                Your payment evidence is ready to submit.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setError("");
              onChange("");
            }}
            className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      {!value && !uploading && (
        <p className="mt-4 text-xs font-medium text-red-600">
          Payment evidence is required before you can submit your order.
        </p>
      )}
    </section>
  );
};

export default CheckoutPaymentEvidence;