import React from "react";

const Contacts = () => {
  return (
    <section className="bg-[#F8F6F2]">
      <div className="mx-auto max-w-[1400px] px-8 py-20">
        <div className="grid gap-20 lg:grid-cols-2">

          {/* Form */}
          <div>
            <form>
              <h2 className="font-display mb-8 text-3xl font-bold text-[#0B0B0B]">
                Send a Message
              </h2>

              <div className="mb-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="w-full rounded-xl border-2 border-[#EAE6DD] bg-white px-5 py-4 text-sm outline-none focus:border-[#FAD90C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="w-full rounded-xl border-2 border-[#EAE6DD] bg-white px-5 py-4 text-sm outline-none focus:border-[#FAD90C]"
                  />
                </div>
              </div>


              <div className="mb-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Phone / WhatsApp
                </label>

                <input
                  type="tel"
                  className="w-full rounded-xl border-2 border-[#EAE6DD] bg-white px-5 py-4 text-sm outline-none focus:border-[#FAD90C]"
                />
              </div>


              <div className="mb-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Subject
                </label>

                <input
                  type="text"
                  className="w-full rounded-xl border-2 border-[#EAE6DD] bg-white px-5 py-4 text-sm outline-none focus:border-[#FAD90C]"
                />
              </div>


              <div className="mb-7">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Message
                </label>

                <textarea
                  rows={5}
                  className="w-full resize-none rounded-xl border-2 border-[#EAE6DD] bg-white px-5 py-4 text-sm outline-none focus:border-[#FAD90C]"
                />
              </div>


              <button
                type="button"
                className="w-full rounded-xl bg-[#FAD90C] py-5 text-xs font-bold uppercase tracking-[0.15em] text-[#0B0B0B]"
              >
                Send Message
              </button>

            </form>
          </div>


          {/* Info */}
          <div>
            <h2 className="font-display mb-10 text-3xl font-bold text-[#0B0B0B]">
              Reach Us Directly
            </h2>


            <div className="space-y-6">

              <div className="flex gap-5 rounded-2xl border border-[#EAE6DD] bg-white p-6">
                <div className="w-1 rounded-full bg-[#FAD90C]" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FAD90C]">
                    WhatsApp
                  </p>

                  <h3 className="font-display mt-2 text-xl font-semibold">
                    +234 801 234 5678
                  </h3>

                  <p className="mt-1 text-xs text-[#999]">
                    Available Mon–Sat, 9am–6pm WAT
                  </p>
                </div>
              </div>


              <div className="flex gap-5 rounded-2xl border border-[#EAE6DD] bg-white p-6">
                <div className="w-1 rounded-full bg-[#FAD90C]" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FAD90C]">
                    Email
                  </p>

                  <h3 className="font-display mt-2 text-xl font-semibold">
                    hello@signaturebysarah.com
                  </h3>

                  <p className="mt-1 text-xs text-[#999]">
                    Response within 24 hours
                  </p>
                </div>
              </div>


              <div className="flex gap-5 rounded-2xl border border-[#EAE6DD] bg-white p-6">
                <div className="w-1 rounded-full bg-[#FAD90C]" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FAD90C]">
                    Location
                  </p>

                  <h3 className="font-display mt-2 text-xl font-semibold">
                    Victoria Island, Lagos
                  </h3>

                  <p className="mt-1 text-xs text-[#999]">
                    By appointment only
                  </p>
                </div>
              </div>

            </div>


            <a
              href="#"
              className="mt-8 flex justify-center rounded-xl bg-[#25D366] py-5 text-xs font-bold uppercase tracking-[0.1em] text-white"
            >
              Chat on WhatsApp
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contacts;