"use client";

import {
  SearchIcon,
  HeartIcon,
  MenuIcon,
  XIcon,
  ShoppingBagIcon,
  HistoryIcon,
  CircleUserRound,
  LogOut,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Container from "../shared/Container";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/providers/AuthProvider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { authQuery } from "@/providers/query";
import CartSidebar from "../modals/CartSidebar";

const readGuestItemCount = (): number => {
  try {
    const stored = localStorage.getItem("guest-cart");
    if (!stored) return 0;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guestCartCount, setGuestCartCount] = useState(0);
  const { session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["my-quotes"],
    queryFn: () => authQuery("/api/cart"),
    enabled: !!session,
    staleTime: 60 * 1000,
  });

  const cartCount = session
    ? cartData?.data?.items?.length ?? 0
    : guestCartCount;

  // Guest cart count: read on mount, and refresh whenever it changes —
  // either from another tab (native "storage" event) or the same tab
  // (custom "guest-quote-updated" event dispatched from guest-cart.ts).
  useEffect(() => {
    if (session) return;

    const refreshGuestCount = () => setGuestCartCount(readGuestItemCount());

    refreshGuestCount();

    window.addEventListener("storage", refreshGuestCount);
    window.addEventListener("guest-cart-updated", refreshGuestCount);

    return () => {
      window.removeEventListener("storage", refreshGuestCount);
      window.removeEventListener("guest-cart-updated", refreshGuestCount);
    };
  }, [session]);

  const handleLogout = async () => {
    const logoutPromise = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error("Failed to logout");
      }
    };

    toast.promise(logoutPromise(), {
      loading: "Logging out...",
      success: () => {
        router.push("/");
        router.refresh();
        return "Logged out successfully";
      },
      error: "Failed to logout",
    });
  };

  const loginWithGoogle = async () => {
    localStorage.setItem(
      "auth_redirect",
      window.location.pathname + window.location.search
    );

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/product" },
    { label: "Custom Order", href: "/custom" },
    { label: "Academy", href: "/academy" },
    { label: "Size Guide", href: "/guide" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-near-black
          transition-all duration-300
          ${
            scrolled
              ? "border-b border-gold/15 shadow-[0_2px_30px_rgba(0,0,0,0.4)]"
              : "border-b border-transparent"
          }
        `}
      >
        <Container>
          <div className=" h-18 flex items-center justify-between">
            <button className="flex items-center gap-3">
              <Link href={"/"}>
                <Image
                  src="/sarah-logo.jpg"
                  alt="SBS Logo"
                  width={42}
                  height={42}
                  className="rounded cursor-pointer"
                />
              </Link>
              <div className="flex flex-col leading-none">
                <span className="text-gold text-[13px] font-bold tracking-[0.06em]">
                  SIGNATURE
                </span>
                <span className="text-white/55 text-[9px] font-normal tracking-[0.2em] uppercase">
                  by sarah
                </span>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-9">
              {navLinks.map(({ label, href }) => {
                const active =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                    text-[11px]
                    font-medium
                    tracking-[0.12em]
                    uppercase
                    transition-colors
                    ${active ? "text-gold" : "text-white/75 hover:text-gold"}
                  `}
                  >
                    {label}
                  </Link>
                );
              })}
              {session && (
                <Link
                  href="history"
                  className="text-white/75 hover:text-gold"
                >
                  History
                </Link>
              )}
            </div>

            <div className="flex items-center gap-5">
             

              <button className="hidden lg:block text-white/70 hover:text-gold transition">
                <HeartIcon size={20} />
              </button>

              <span className="relative  text-white/70 hover:text-gold transition">
                <CartSidebar />

                {/* {cartCount > 0 && (
                    <span
                      className="
                    absolute -top-2 -right-2
                    h-4 w-4
                    rounded-full
                    bg-gold
                    text-[#0B0B0B]
                    text-[9px]
                    font-bold
                    flex items-center justify-center
                  "
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        cartCount
                      )}
                    </span>
                  )} */}
              </span>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white/80"
              >
                <MenuIcon size={24} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="bg-transparent px-0 hover:bg-transparent cursor-pointer border-none"
                  render={<Button variant="outline" />}
                >
                  <CircleUserRound className="text-white" size={40} />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-50">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      {session ? (
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-1 rounded-lg text-sm font-semibold text-[#0B0B0B] transition "
                        >
                          Logout
                          <LogOut className="h-[0.5px] w-[0.5px]" />
                        </button>
                      ) : (
                        <button
                          onClick={loginWithGoogle}
                          className="w-full cursor-pointer flex items-center gap-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider text-black"
                        >
                          <img src="/googles.png" className="w-4" /> Login with
                          Google
                        </button>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Container>
      </nav>

      {mobileOpen && (
        <div
          className="
          fixed inset-0 z-100
          bg-near-black
          px-8 py-6
          flex flex-col
        "
        >
          <div className="flex justify-between items-center mb-12">
            <span className="text-gold font-bold tracking-widest">
              SIGNATURE
            </span>

            <button onClick={() => setMobileOpen(false)} className="text-white">
              <XIcon />
            </button>
          </div>

          <div className="flex flex-col">
            {navLinks.map(({ label, href }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));

              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    text-3xl
                    py-3
                    border-b border-white/10
                    ${active ? "text-gold" : "text-white"}
                  `}
                >
                  {label}
                </a>
              );
            })}
          </div>

          <div className="mt-auto flex gap-6">
            <a className="text-white/50 text-xs uppercase tracking-widest">
              Instagram
            </a>
            <a className="text-white/50 text-xs uppercase tracking-widest">
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
