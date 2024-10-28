import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/atoms'
import { useToastAlerts } from '@/hooks';
import React from 'react'

interface Props{
    open: boolean,
    onOpenChange: (value: boolean) => void,
    title: string,
    description: string,
    btnCancelTitle: string,
    btnAcceptTitle: string,
    action: () => void | Promise<void>;
}

export default function AlertConfirm({open, onOpenChange, title, description, btnCancelTitle, btnAcceptTitle, action}: Props) {
  const  {toastWarning} = useToastAlerts();
  
  const handleCancel = ()=>{
    toastWarning('Cancelado', 'Cancelaste la acción, no se aplicarán cambios');
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="bg-white max-md:max-w-[350px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-base-secondary text-white" onClick={handleCancel}>
              {btnCancelTitle}
            </AlertDialogCancel>
            <AlertDialogAction className="bg-base-primary text-white" onClick={action}>
              {btnAcceptTitle}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}
