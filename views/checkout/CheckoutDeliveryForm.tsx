"use client";

interface DeliveryAddress {
  address: string;
  city: string;
  state: string;
  country: string;
}

interface Props {
  delivery: DeliveryAddress;
  onChange: (field: keyof DeliveryAddress, value: string) => void;
}

const CheckoutDeliveryForm = ({ delivery, onChange }: Props) => {
  return (
    <div className="rounded-[20px] border border-border bg-white p-7 lg:p-9">
      <div className="mb-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#927f04]">
          Delivery
        </p>

        <h2 className="mt-2 font-display text-2xl font-bold text-near-black">
          Delivery Address
        </h2>

        <p className="mt-2 text-sm text-[#888]">
          Where should we deliver your order?
        </p>
      </div>

      <div className="grid gap-4">
        <textarea
          value={delivery.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Full delivery address"
          required
          rows={4}
          className="w-full resize-none rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={delivery.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="City"
            required
            className="w-full rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black"
          />

          <input
            value={delivery.state}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="State"
            required
            className="w-full rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black"
          />
        </div>

        <input
          value={delivery.country}
          onChange={(e) => onChange("country", e.target.value)}
          placeholder="Country"
          required
          className="w-full rounded-xl border border-border bg-off-white px-4 py-3.5 text-sm outline-none transition focus:border-near-black"
        />
      </div>
    </div>
  );
};

export default CheckoutDeliveryForm;