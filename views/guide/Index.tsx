"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

type SizeCategory =
  | "women"
  | "men"
  | "toddlers"
  | "preschool"
  | "kids"
  | "junior";

const SIZE_CHARTS
 = {
  women: {
    label: "Women's",
    rows: [
      ["21.2 - 22.1", "35", "2.5", "4.5"],
      ["22.2 - 22.8", "36", "3", "5"],
      ["22.9 - 23.5", "37", "4", "6"],
      ["23.6 - 24.1", "38", "5", "7"],
      ["24.2 - 24.8", "39", "6", "8"],
      ["24.9 - 25.4", "40", "7", "9"],
      ["25.5 - 26.1", "41", "8", "10"],
      ["26.2 - 26.8", "42", "8.5", "10.5"],
      ["26.9 - 27.4", "43", "9", "11"],
    ],
  },
  men: {
    label: "Men's",
    rows: [
      ["24.6 - 25.5", "40", "6", "7"],
      ["25.6 - 26.2", "41", "7", "8"],
      ["26.3 - 26.9", "42", "8", "9"],
      ["27.0 - 27.5", "43", "9", "10"],
      ["27.6 - 28.2", "44", "10", "11"],
      ["28.3 - 28.9", "45", "11", "12"],
      ["29.0 - 29.6", "46", "11.5", "12.5"],
      ["29.7 - 30.3", "47", "12", "13"],
      ["30.4 - 30.9", "48", "13", "14"],
      ["31.0 - 31.6", "49", "14", "15"],
      ["31.7 - 32.3", "50", "15", "16"],
      ["32.4 - 33.0", "51", "16", "17"],
    ],
  },
  toddlers: {
    label: "Toddlers",
    rows: [
      ["9.4 - 10.2", "18", "2", "3"],
      ["10.3 - 10.9", "19", "3", "4"],
      ["11.0 - 11.6", "20", "4", "5"],
      ["11.7 - 12.3", "21", "4.5", "5.5"],
      ["12.4 - 13.0", "22", "5", "6"],
      ["13.1 - 13.6", "23", "6", "7"],
      ["13.7 - 14.3", "24", "7", "8"],
    ],
  },
  preschool: {
    label: "Preschool",
    rows: [
      ["14.4 - 14.9", "25", "8", "9"],
      ["15.0 - 15.6", "26", "8.5", "9.5"],
      ["15.7 - 16.3", "27", "9", "10"],
      ["16.4 - 17.0", "28", "10", "11"],
      ["17.1 - 17.6", "29", "11", "11.5"],
    ],
  },
  kids: {
    label: "Kids",
    rows: [
      ["17.7 - 18.3", "30", "11.5", "12"],
      ["18.4 - 19.0", "31", "12", "13"],
      ["19.1 - 19.6", "32", "13", "1"],
      ["19.7 - 20.2", "33", "1", "2"],
      ["20.3 - 20.9", "34", "2", "3"],
    ],
  },
  junior: {
    label: "Junior",
    rows: [
      ["21.0 - 21.7", "35", "3", "4"],
      ["21.8 - 22.4", "36", "3.5", "4.5"],
      ["22.5 - 23.1", "37", "4.5", "5.5"],
      ["23.2 - 23.8", "38", "5", "6"],
      ["23.9 - 24.4", "39", "6", "7"],
    ],
  },
};

const HOW_TO_MEASURE_STEPS = [
  {
    number: "01",
    caption:
      "Place a piece of paper larger than your foot against the wall. Ensure that the wall is flat, and if there is any skirting, it is also flat.",
  },
  {
    number: "02",
    caption:
      "Stand on the paper with your heel against the wall. Ensure that the floor is hard and that the paper does not slide under any gap between the floor and the wall/skirting.",
  },
  {
    number: "03",
    caption:
      "Mark the paper where your longest toe reaches with the pencil. Remember to not tuck the pencil under the toe as you want an accurate maximum measurement.",
  },
  {
    number: "04",
    caption:
      "Measure the distance from the end of the paper to the toe line with a ruler or tape measure.",
  },
  {
    number: "05",
    caption:
      "Repeat with your other foot, they might be different — trust us on this one! — and then use the longest measurement.",
  },
  {
    number: "06",
    caption: "Use our conversion tables below to work out your recommended fit.",
  },
];

const NAV_SECTIONS = [
  { id: "shapes", label: "Shapes and Sizes" },
  { id: "measure", label: "Measure" },
  { id: "size-chart", label: "Size Chart" },
  { id: "fitting", label: "Fitting" },
];

const SizeGuidePage = () => {
  const [sizeCategory, setSizeCategory] = useState<SizeCategory>("women");
  const activeChart = SIZE_CHARTS[sizeCategory];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
    
    className="bg-off-white">
      {/* Header */}
      <div
  className="relative h-screen flex flex-col justify-center items-center  overflow-hidden px-6 py-16 text-center md:py-24"
  style={{
    backgroundImage: 'url("/heros.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10">
    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
      Size and Fit Guide
    </p>

    <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">
      Make Sure Your Fit Is Right
    </h1>

    <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-white/60">
      Start with your regular size, regardless of the brand. If you are
      unsure what your size is, please check our guide below. Fit is
      personal, but we're here to help.
    </p>
  </div>
</div>
      {/* Section nav */}
      <div className="sticky top-0 z-10 border-b border-border bg-off-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl gap-6 overflow-x-auto px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#999]">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="whitespace-nowrap transition hover:text-near-black"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-24">
        {/* 01 — Shapes and Sizes */}
        <section id="shapes">
          <div className="mb-6 flex items-start gap-4">
            <span className="font-display text-4xl font-bold text-gold/60">01.</span>
            <h2 className="mt-1 font-display text-2xl font-bold text-near-black md:text-3xl">
              Feet Come in Different Shapes and Sizes
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-[#666]">
            Millions of years of evolution have done an amazing job. The
            human foot is perfectly designed for standing, walking, and
            running.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666]">
            Remarkably, feet come in all sorts of shapes and sizes. Some have
            been compromised by a lifetime in conventional shoes, some
            naturally wider and some thinner and longer. We're confident
            you'll find a pair to suit you.
          </p>

          <div className="mt-8 flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-white text-sm text-[#999]">
            Illustration: Foot shapes
          </div>
        </section>

        {/* 02 — How to Measure */}
        <section id="measure">
          <div className="mb-6 flex items-start gap-4">
            <span className="font-display text-4xl font-bold text-gold/60">02.</span>
            <h2 className="mt-1 font-display text-2xl font-bold text-near-black md:text-3xl">
              How to Measure
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {HOW_TO_MEASURE_STEPS.map((step) => (
              <div key={step.number}>
                <div className="relative mb-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-white text-sm text-[#999]">
                  Illustration {step.number}
                  <span className="absolute right-3 top-3 text-lg font-black text-near-black">
                    {step.number}
                  </span>
                </div>

                <p className="text-center text-xs leading-6 text-[#666]">
                  {step.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 03 — Size Chart */}
        <section id="size-chart">
          <div className="mb-6 flex items-start gap-4">
            <span className="font-display text-4xl font-bold text-gold/60">03.</span>
            <h2 className="mt-1 font-display text-2xl font-bold text-near-black md:text-3xl">
              Size Chart
            </h2>
          </div>

          <div className="mb-6 flex flex-wrap gap-1.5">
            {(Object.keys(SIZE_CHARTS) as SizeCategory[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSizeCategory(key)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  sizeCategory === key
                    ? "border-near-black bg-near-black text-gold"
                    : "border-border bg-white text-[#666]"
                }`}
              >
                {SIZE_CHARTS[key].label}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-near-black">
                    {["Foot Length (cm)", "EU", "UK", "US"].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gold"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {activeChart.rows.map((row, index) => (
                    <tr
                      key={row[0]}
                      className={`border-b border-border ${
                        index % 2 === 0 ? "bg-off-white" : "bg-white"
                      }`}
                    >
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`px-4 py-4 text-center ${
                            i === 0 ? "font-bold text-near-black" : "text-[#666]"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 04 — Fitting */}
        <section id="fitting">
          <div className="mb-6 flex items-start gap-4">
            <span className="font-display text-4xl font-bold text-gold/60">04.</span>
            <h2 className="mt-1 font-display text-2xl font-bold text-near-black md:text-3xl">
              Fitting
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-[#666]">
            Measuring your feet will help tell us what your recommended fit
            is. However, some like a shorter, snug fit while others prefer a
            longer, more spacious fit. This is where personal choice comes
            in.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666]">
            It's also important to note there will be slight variations in
            size from one style to another. Please check the product page
            to see if a style runs large, small, or true to size.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-sm text-[#999]">
                Illustration: Snug
              </div>

              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                Recommended
              </p>

              <h3 className="mb-2 font-display text-lg font-bold text-near-black">
                Snug
              </h3>

              <p className="text-xs leading-6 text-[#666]">
                This shows how a shoe would fit snug. It's still a correct
                fit, but with less space around and at the front of the
                toebox.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-near-black bg-white p-6">
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-sm text-[#999]">
                Illustration: Recommended
              </div>

              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                Recommended
              </p>

              <h3 className="mb-2 font-display text-lg font-bold text-near-black">
                True to Size
              </h3>

              <p className="text-xs leading-6 text-[#666]">
                This shows the fit based on measuring your feet with our
                guide and matching it to the size chart above.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-sm text-[#999]">
                Illustration: Spacious
              </div>

              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                Recommended
              </p>

              <h3 className="mb-2 font-display text-lg font-bold text-near-black">
                Spacious
              </h3>

              <p className="text-xs leading-6 text-[#666]">
                If you prefer a roomier fit or think you have wider-than-
                average feet, you might consider going a size up.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-gold/10 p-10 text-center">
          <MessageCircle size={24} className="text-[#927f04]" />

          <p className="max-w-md text-sm leading-6 text-[#666]">
            If you are still unsure about your size, contact us via WhatsApp
            and we'll help you find the right fit.
          </p>
<a
          
            href="https://wa.me/447552248305"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-near-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-gold"
          >
            Chat With Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;