import { cn } from "@/lib/utils"
import { Label } from "./label"

interface ProductLabelProps {
  title: string
  amount: string
  currencyCode: string
  position?: "bottom" | "center"
  className?: string
}

export function ProductLabel({ title, amount, currencyCode, position = "bottom", className }: ProductLabelProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start rounded-md bg-white/80 p-2 text-black backdrop-blur-sm dark:bg-black/60 dark:text-white",
        position === "center" && "items-center",
        className,
      )}
    >
      <Label className="mb-1">{title}</Label>
      <span className="text-xs font-medium">
        {amount} {currencyCode}
      </span>
    </div>
  )
}

