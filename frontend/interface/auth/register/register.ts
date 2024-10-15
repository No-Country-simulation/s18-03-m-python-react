export interface FormStore {
    step: number;
    setStep: (step: number) => void;
    isStepValid: boolean;
    setIsStepValid: (isValid: boolean) => void;
  }