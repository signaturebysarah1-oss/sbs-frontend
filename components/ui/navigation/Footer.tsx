import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
const Footer = () => {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        ["All Products", "/shop"],
        ["Loafers", "/shop"],
        ["Boots", "/shop"],
        ["Sandals", "/shop"],
        ["Women's", "/shop"],
      ],
    },
    {
      title: "Services",
      links: [
        ["Custom Order", "/custom"],
        ["Size Guide", "/size-guide"],
        ["About", "/about"],
        ["Contact", "/contact"],
      ],
    },
  ];

  return (
    <footer className="border-t border-[#FAD90C]/15 bg-[#0B0B0B]">

      <Container className="mx-auto grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/sarah-logo.jpg"
              alt="SBS Logo"
              width={42}
              height={42}
              className="rounded"
            />
            <div>
              <div className="font-display text-base font-bold tracking-wide text-[#FAD90C]">
                SIGNATURE
              </div>

              <div className="text-[9px] uppercase tracking-[0.2em] text-[#F8F6F2]/40">
                by sarah
              </div>
            </div>
          </div>

          <p className="mb-6 max-w-[280px] text-sm font-light leading-relaxed text-[#F8F6F2]/45">
            Handcrafted leather footwear and accessories, made in Lagos for the
            world's discerning few.
          </p>

          <div className="flex gap-4">
            {["IG", "TW", "FB", "TK"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F8F6F2]/15 text-[10px] font-bold text-[#F8F6F2]/50 transition hover:border-[#FAD90C] hover:text-[#FAD90C]"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {footerLinks.map((column) => (
          <div key={column.title}>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAD90C]">
              {column.title}
            </h4>

            <div className="flex flex-col gap-3">
              {column.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-light text-[#F8F6F2]/50 transition hover:text-[#FAD90C]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAD90C]">
            Contact
          </h4>

          <div className="flex flex-col gap-3.5">
            {[
              "Victoria Island, Lagos",
              "+234 801 234 5678",
              "hello@signaturebysarah.com",
              "Mon – Sat: 9am – 6pm WAT",
            ].map((item) => (
              <span key={item} className="text-sm font-light text-[#F8F6F2]/45">
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom */}
      <Container className="mx-auto flex  flex-col justify-between gap-5 border-t border-[#F8F6F2]/6  py-5 md:flex-row">
        <span className="text-[11px] tracking-wide text-[#F8F6F2]/30">
          © 2025 Signature by Sarah. All rights reserved.
        </span>

        <div className="flex gap-6">
          {[
            ["Privacy Policy", "/privacy"],
            ["Terms of Service", "/terms"],
            ["Shipping Policy", "/shipping"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-[11px] tracking-wide text-[#F8F6F2]/30 transition hover:text-[#FAD90C]"
            >
              {label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
