import Image from "next/image";

const EmptyCartState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-8 py-[100px] text-center">
      <Image
        src="/emptycart.png"
        alt="empty cart"
        width={200}
        height={200}
        className="rounded"
      />

      <div>
        <h2 className="mb-3 text-[32px] font-bold tracking-[-0.01em] text-near-black font-[var(--font-display)]">
          Your Quote Cart is Empty
        </h2>

        <p className="max-w-[360px] text-sm font-light leading-[1.8] text-[#888] font-[var(--font-sans)]">
          Browse our collection and add pieces you love. We'll prepare a
          personalised quote tailored to your selections.
        </p>
      </div>

      <button className="cursor-pointer rounded-[10px] border-none bg-near-black px-10 py-4 text-[11px] font-bold uppercase tracking-[0.14em]  text-gold transition-transform duration-200 font-[var(--font-sans)]">
        Explore the Collection
      </button>
    </div>
  );
};

export default EmptyCartState;