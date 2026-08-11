"use client";

interface Props {
  contactMethod: "email" | "whatsapp" | null;
  phoneNumber: string;
  existingPhone?: string | null;
  onChange: (method: "email" | "whatsapp") => void;
  onPhoneChange: (value: string) => void;
}

const CheckoutContactMethod = ({
  contactMethod,
  phoneNumber,
  existingPhone,
  onChange,
  onPhoneChange,
}: Props) => {
  const needsPhone = contactMethod === "whatsapp" && !existingPhone;

  return (
    <section className="rounded-[24px] border border-border bg-white p-7 lg:p-9">
      <div className="mb-8 flex items-start gap-5">
        <span className="font-display text-4xl font-bold leading-none text-[#927f04]">
          02
        </span>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
            Communication
          </p>

          <h2 className="mt-1 font-display text-2xl font-bold text-near-black">
            How Would You Like Us To Contact You?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#888]">
            Choose how our team should contact you about your order.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange("email")}
          className={`rounded-xl border py-4 text-xs font-bold uppercase tracking-wider transition ${
            contactMethod === "email"
              ? "border-near-black bg-near-black text-white"
              : "border-border bg-white text-near-black hover:border-near-black"
          }`}
        >
          Email
        </button>

        <button
          type="button"
          onClick={() => onChange("whatsapp")}
          className={`rounded-xl border py-4 text-xs font-bold uppercase tracking-wider transition ${
            contactMethod === "whatsapp"
              ? "border-near-black bg-near-black text-white"
              : "border-border bg-white text-near-black hover:border-near-black"
          }`}
        >
          WhatsApp
        </button>
      </div>

      {contactMethod === "whatsapp" && (
        <div className="mt-5">
          {existingPhone ? (
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#888]">
                WhatsApp Number
              </label>

              <div className="rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm text-near-black">
                {existingPhone}
              </div>
            </div>
          ) : (
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#888]">
                WhatsApp Number
              </label>

              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="+2348012345678"
                required={needsPhone}
                className="w-full rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CheckoutContactMethod;