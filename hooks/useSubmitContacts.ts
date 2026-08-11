import { authFetch } from "@/providers/query/authfetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useSubmitCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      contactMethod: "email" | "whatsapp";
      phoneNumber?: string;
    }) =>
      authFetch("/api/cart/submit", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-quotes"] });
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
    },
  });
};



export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (payload: {
      name: string;
      email: string;
      phone?: string;
      subject?: string;
      message: string;
    }) =>
      authFetch("api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
};



export const useSubmitAcademyApplication = () => {
  return useMutation({
    mutationFn: (payload: {
      fullName: string;
      email: string;
      phone: string;
      country: string;
      experienceLevel: "beginner" | "intermediate" | "advanced";
      motivation: string;
    }) =>
      authFetch("api/academy/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
};

import { postData } from "@/providers/mutations/Index";

export interface AcademyRegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  motivation: string;
}

export const useRegisterAcademy = () => {
  return useMutation({
    mutationFn: (payload: AcademyRegistrationPayload) =>
      postData("api/academy/register", payload),
  });
};