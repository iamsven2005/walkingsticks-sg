import clsx from "clsx"
import Price from "./price"

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string
  amount: string
  currencyCode: string
  position?: "bottom" | "center"
}) => {
  return (
    <div
      className={clsx("absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label", {
        "lg:px-20 lg:pb-[35%]": position === "center",
      })}
    >
      <div className="flex flex-col items-start rounded-lg border bg-white/70 p-2 text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="text-sm font-bold leading-tight tracking-tight mb-1">{title}</h3>
        <Price
          className="text-xs text-gray-600 dark:text-gray-400"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  )
}

export default Label

