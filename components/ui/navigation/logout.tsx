"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to logout");
      return;
    }

    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Stops native event bubbling conflicts
        handleLogout;
      }}
      className="flex items-center gap-1 rounded-lg text-sm font-semibold text-near-black transition "
    >
      Logout
      <LogOut className="h-[0.5px] w-[0.5px]" />

    </button>
  );
};

export default LogoutButton;