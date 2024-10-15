import { cn } from "@/lib/cn/utils"
import { HTMLAttributes } from "react"

function Skeleton({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn("animate-pulse bg-gray-500 ", className)}
      {...props}
    />
  )
}

export { Skeleton }
