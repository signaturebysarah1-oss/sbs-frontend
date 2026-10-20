"use client";

import { supabase } from "@/lib/supabase";
import { QuoteItem } from "@/types/website";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
  onContinueAsGuest: () => void;
  items?: QuoteItem[];
}

const QuoteChoiceModal = ({
  open,
  onClose,
  onContinueAsGuest,
  items,
}: Props) => {
  if (!open) return null;

  const loginWithGoogle = async () => {
    const returnTo =
      window.location.pathname + window.location.search + window.location.hash;

    localStorage.setItem("auth_redirect", returnTo);
    localStorage.setItem("guest-cart", JSON.stringify(items ?? []));

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in failed:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <div className="w-full max-w-md rounded-2xl bg-white p-8">
        <h2 className="font-display text-2xl font-bold text-near-black">
          Submit Quote Request
        </h2>

        <p className="mt-3 text-sm text-[#777]">
          Submit your quote request without creating an account. Your details
          will only be used for this request and won't be saved for future
          purchases.
        </p>

        <button
          onClick={loginWithGoogle}
          className="mt-6 flex w-full items-center justify-center gap-1 rounded-xl bg-near-black py-4 text-xs font-bold uppercase tracking-wider text-white"
        >
          <img src="/googles.png" alt="Google" className="w-5" />
          Continue with Google
        </button>

        <div>
          {/* <Link href="/checkout"> */}
            <div onClick={()=> onContinueAsGuest()} className="mt-3 w-full rounded-xl border border-border py-4 text-center text-xs font-bold uppercase tracking-wider text-near-black">
              Continue as Guest
            </div>
          {/* </Link> */}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full text-xs text-[#999] underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default QuoteChoiceModal;
