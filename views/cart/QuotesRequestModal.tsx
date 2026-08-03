"use client";

import { supabase } from "@/lib/supabase";
import { QuoteItem } from "@/types/website";

interface Props {
  open: boolean;
  onClose: () => void;
  onContinueAsGuest: () => void;
  items:QuoteItem[]
}

const QuoteChoiceModal = ({
  open,
  onClose,
  onContinueAsGuest,
  items
}: Props) => {
  if (!open) return null;

 const loginWithGoogle = async () => {
  localStorage.setItem(
    "auth_redirect",
    window.location.pathname
  );

  localStorage.setItem(
    "sbs-quote",
    JSON.stringify(items)
  );

  await supabase.auth.signInWithOAuth({
    provider:"google",
    options:{
      redirectTo:`${window.location.origin}/auth/callback`,
    },
  });
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <div className="w-full max-w-md rounded-2xl bg-white p-8">
        <h2 className="font-display text-2xl font-bold text-[#0B0B0B]">
          Submit Quote Request
        </h2>

        <p className="mt-3 text-sm text-[#777]">
        Submit your quote request without creating an account. Your details will only be used for this request and won't be saved for future purchases.        </p>

        <button       onClick={loginWithGoogle}
 className="mt-6 w-full flex items-center justify-center gap-1  rounded-xl bg-[#0B0B0B] py-4 text-xs font-bold uppercase tracking-wider text-[white]">
        <img src="/googles.png" className="w-5"/>  Continue with Google
        </button>

        <button
          onClick={onContinueAsGuest}
          className="mt-3 w-full rounded-xl border border-[#EAE6DD] py-4 text-xs font-bold uppercase tracking-wider text-[#0B0B0B]"
        >
          Continue as Guest
        </button>

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