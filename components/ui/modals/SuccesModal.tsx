"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

type SuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const SuccessModal = ({
  open,
  onOpenChange,
  title = "Success!",
  description = "Your submission was received.",
  children,
}: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl border border-gold/20 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.15)] sm:max-w-md sm:p-10">
        <DialogHeader className="items-center text-center">
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gold/10 animate-pulse" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg shadow-gold/20">
                <Check
                  className="h-9 w-9 text-near-black"
                  strokeWidth={3}
                />
              </div>
            </div>
          </div>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
            Successfully Completed
          </p>

          <DialogTitle className="mt-1 font-display text-3xl font-bold tracking-tight text-near-black">
            {title}
          </DialogTitle>

          <DialogDescription className="mt-3 max-w-sm text-sm leading-7 text-[#777]">
            {description}
          </DialogDescription>
        </DialogHeader>

        {children && (
          <div className="mt-6 border-t border-border pt-5">
            {children}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;