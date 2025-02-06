"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import type { FormEvent } from "react"

export default function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const searchInput = form.elements.namedItem("q") as HTMLInputElement
    const searchQuery = searchInput.value
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 pr-10 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mr-1 flex h-full items-center p-2 text-neutral-500 hover:text-black dark:hover:text-white"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  )
}

export function SearchSkeleton() {
  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 pr-10 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        disabled
      />
      <div className="absolute right-0 top-0 mr-1 flex h-full items-center p-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-neutral-500" />
      </div>
    </div>
  )
}

