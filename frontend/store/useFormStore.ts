import { create } from "zustand";
import { FormStore } from "../app/(lng)/(routes)/(auth)/register/interface";

export const useFormStore = create<FormStore>((set) => ({
  step: 1,
  setStep: (step: number) => set({ step }),
  isStepValid: false,
  setIsStepValid: (isValid: boolean) => set({ isStepValid: isValid }),
}));
