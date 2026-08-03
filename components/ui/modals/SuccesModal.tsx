import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import Image from "next/image";
  import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
        <DialogContent className="max-w-[90%] rounded-2xl border border-[#EAE6DD] border-t-4 border-t-[#C9A227] bg-[#F8F6F2] p-8 sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A227]/10">
            <DotLottieReact
      src="https://lottie.host/58c9692b-0bd4-481e-a73e-02686ab743db/RruKt44NAk.json"
      loop
      autoplay
    />
            </div>
  
            <DialogTitle className="mt-5 font-display text-2xl font-bold text-[#0B0B0B]">
              {title}
            </DialogTitle>
  
            <DialogDescription className="mt-2 text-sm leading-6 text-[#777]">
              {description}
            </DialogDescription>
          </DialogHeader>
  
          {children}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default SuccessModal;