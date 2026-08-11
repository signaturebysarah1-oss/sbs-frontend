
"use client";

import { useState } from "react";
import { toast } from "sonner";
import Container from "@/components/ui/shared/Container";
import { useSubmitContact } from "@/hooks/useSubmitContacts";

const Contacts = () => {
  const { mutate: submitContact, isPending } = useSubmitContact();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    submitContact(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Message sent successfully");

          setForm({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        },

        onError: (error: any) => {
          console.error(error);
          toast.error(
            error?.message || "Failed to send message. Please try again."
          );
        },
      }
    );
  };

  return (
    <section>
      <Container>
        <div className="grid my-10 gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <h2 className="font-display mb-8 text-3xl font-bold text-near-black">
                Send a Message
              </h2>

              <div className="mb-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                    Full Name
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-border bg-white px-5 py-4 text-sm outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-border bg-white px-5 py-4 text-sm outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Phone / WhatsApp
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-border bg-white px-5 py-4 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Subject
                </label>

                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-border bg-white px-5 py-4 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="mb-7">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border-2 border-border bg-white px-5 py-4 text-sm outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-gold py-5 text-xs font-bold uppercase tracking-[0.15em] text-near-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div>
            <h2 className="font-display mb-10 text-3xl font-bold text-near-black">
              Reach Us Directly
            </h2>


            <div className="space-y-6">

              <div className="flex gap-5 rounded-2xl border border-border bg-white p-6">
                <div className="w-1 rounded-full bg-gold" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em]  text-gold">
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


              <div className="flex gap-5 rounded-2xl border border-border bg-white p-6">
                <div className="w-1 rounded-full bg-gold" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em]  text-gold">
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


              <div className="flex gap-5 rounded-2xl border border-border bg-white p-6">
                <div className="w-1 rounded-full bg-gold" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em]  text-gold">
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
              className="mt-8 flex justify-center rounded-xl bg-[#25D366] py-5 text-xs font-bold uppercase tracking-widest text-white"
            >
              Chat on WhatsApp
            </a>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contacts;