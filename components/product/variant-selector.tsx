"use client"

import clsx from "clsx"
import { useProduct, useUpdateURL } from "../../components/product/product-context"
import type { ProductOption, ProductVariant } from "../../lib/shopify/types"

type Combination = {
  id: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
  [key: string]: string | boolean | { amount: string; currencyCode: string }
}

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[]
  variants: ProductVariant[]
}) {
  const { state, updateOption } = useProduct()
  const updateURL = useUpdateURL()
  const hasNoOptionsOrJustOneOption = !options.length || (options.length === 1 && options[0]?.values.length === 1)

  if (hasNoOptionsOrJustOneOption) {
    return null
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    price: variant.price,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {},
    ),
  }))

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase()

            // Base option params on current selectedOptions so we can preserve any other param state.
            const optionParams = { ...state, [optionNameLowerCase]: value }

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find((option) => option.name.toLowerCase() === key && option.values.includes(value)),
            )
            const matchingCombination = combinations.find((combination) =>
              filtered.every(([key, value]) => combination[key] === value && combination.availableForSale),
            )

            // The option is active if it's in the selected options.
            const isActive = state[optionNameLowerCase] === value

            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value)
                  updateURL(newState)
                }}
                key={value}
                aria-disabled={!matchingCombination}
                disabled={!matchingCombination}
                title={`${option.name} ${value}${!matchingCombination ? " (Out of Stock)" : ""}`}
                className={clsx(
                  "flex min-w-[48px] flex-col items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                  {
                    "cursor-default ring-2 ring-blue-600": isActive,
                    "ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600":
                      !isActive && matchingCombination,
                    "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700":
                      !matchingCombination,
                  },
                )}
              >
                <span>{value}</span>
              </button>
            )
          })}
        </dd>
      </dl>
    </form>
  ))
}

