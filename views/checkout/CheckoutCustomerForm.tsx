"use client";

interface Props {
  name: string;
  email: string;
  phone: string;
  disabled?: boolean;
  onChange: (field: "name" | "email" | "phone", value: string) => void;
}

const CheckoutCustomerForm = ({
  name,
  email,
  phone,
  disabled = false,
  onChange,
}: Props) => {
  return (
    <section className="rounded-[24px] border border-border bg-white p-7 lg:p-9">
      <div className="mb-8 flex items-start gap-5">
        <span className="font-display text-4xl font-bold leading-none text-[#927f04]">
          01
        </span>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
            Customer Information
          </p>

          <h2 className="mt-1 font-display text-2xl font-bold text-near-black">
            Your Details
          </h2>

          <p className="mt-2 text-sm text-[#888]">
            {disabled
              ? "These details are linked to your account."
              : "Tell us who we should contact about this order."}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <input
          value={name}
          disabled={disabled}
          required
          placeholder="Full Name"
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black disabled:cursor-not-allowed disabled:bg-[#f0eee9] disabled:text-[#777]"
        />

        <input
          value={email}
          disabled={disabled}
          required
          type="email"
          placeholder="Email Address"
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black disabled:cursor-not-allowed disabled:bg-[#f0eee9] disabled:text-[#777]"
        />

        <input
          value={phone}
          disabled={disabled}
          required
          type="tel"
          placeholder="Phone / WhatsApp"
          onChange={(e) => onChange("phone", e.target.value)}
          className="w-full rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black disabled:cursor-not-allowed disabled:bg-[#f0eee9] disabled:text-[#777]"
        />
      </div>
    </section>
  );
};

export default CheckoutCustomerForm;