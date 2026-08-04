// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";

// import { supabase } from "@/lib/supabase";
// import { createQuote } from "@/providers/quoteMutation";

// export default function Callback() {
//   const router = useRouter();

//   const { mutate } = useMutation({
//     mutationFn: createQuote,
//   });

//   useEffect(() => {
//     const handleAuth = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (!session) {
//         router.replace("/");
//         return;
//       }

//       const redirectPath =
//         localStorage.getItem("auth_redirect") || "/";

//       const pendingQuote =
//         localStorage.getItem("sbs-quote");

//       if (pendingQuote) {
//         mutate(
//           {
//             items: JSON.parse(pendingQuote),
//           },
//           {
//             onSuccess: () => {
//               localStorage.removeItem("sbs-quote");
//               localStorage.removeItem("auth_redirect");

//               router.replace(redirectPath);
//             },

//             onError: () => {
//               // Keep the quote so the user can retry.
//               router.replace(redirectPath);
//             },
//           }
//         );

//         return;
//       }

//       localStorage.removeItem("auth_redirect");
//       router.replace(redirectPath);
//     };

//     handleAuth();
//   }, [mutate, router]);

//   return (
//     <p className="flex min-h-screen items-center justify-center">
//       Signing you in...
//     </p>
//   );
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/");
        return;
      }

      let redirectPath =
      localStorage.getItem("auth_redirect") || "/";
    
    const currentStep = localStorage.getItem("custom_step");
    
    if (redirectPath === "/custom" ) {
      redirectPath = `/custom?step=7`;
    }
    
    router.replace(redirectPath);
    
    toast.success("User logged in successfully");
      router.replace(redirectPath);

      toast.success("User logged in successfully");
    };

    handleAuth();
  }, [router]);

  return (
    <p className="flex min-h-screen items-center justify-center">
      Signing you in...
    </p>
  );
}