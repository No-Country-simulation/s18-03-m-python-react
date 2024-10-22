// useToastAlerts.ts
import { useToast } from "@/hooks"; // O el path donde esté useToast

export const useToastAlerts = () => {
  const { toast } = useToast();

  const toastSuccess = (title: string, description: string) => {
    return toast({
      title: title,
      description: description,
      className: "bg-green-500 text-white",
    });
  };

  const toastWarning = (title: string, description: string) => {
    return toast({
      title: title,
      description: description,
      className: "bg-yellow-500 text-white",
    });
  };

  const toastError = (title: string, description: string) => {
    return toast({
      title: title,
      description: description,
      className: "bg-red-500 text-white",
    });
  };

  return { toastSuccess, toastWarning, toastError };
};
