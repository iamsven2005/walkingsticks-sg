"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState, type FormEvent } from "react"

type Suggestion = {
  title: string
  handle: string
}

export default function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentQuery = useMemo(() => searchParams?.get("q") || "", [searchParams])
  const [query, setQuery] = useState(currentQuery)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setQuery(currentQuery)
  }, [currentQuery])

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (trimmedQuery.length < 2) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/search-suggestions?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal
        })

        if (!response.ok) {
          setSuggestions([])
          return
        }

        const payload = (await response.json()) as { suggestions?: Suggestion[] }
        setSuggestions(payload.suggestions || [])
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }
        setSuggestions([])
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, 250)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [query])

  const navigateToSearch = (value: string) => {
    const normalizedValue = value.trim()

    if (!normalizedValue) {
      router.push('/search')
      return
    }

    router.push(`/search?q=${encodeURIComponent(normalizedValue)}`)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigateToSearch(query)
    setIsFocused(false)
  }

  const showSuggestions = isFocused && query.trim().length >= 2

  return (
    <form onSubmit={handleSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 pr-10 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mr-1 flex h-full items-center p-2 text-neutral-500 hover:text-black dark:hover:text-white"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {showSuggestions ? (
        <div className="absolute left-0 top-full z-40 mt-2 max-h-72 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-black">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">Searching products...</div>
          ) : null}

          {!isLoading && suggestions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">No matching products found</div>
          ) : null}

          {!isLoading && suggestions.length > 0
            ? suggestions.map((suggestion) => (
                <button
                  key={suggestion.handle}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion.title)
                    setIsFocused(false)
                    router.push(`/products/${suggestion.handle}`)
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  <span className="line-clamp-1">{suggestion.title}</span>
                  <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">Product</span>
                </button>
              ))
            : null}

          <button
            type="button"
            onClick={() => {
              navigateToSearch(query)
              setIsFocused(false)
            }}
            className="w-full border-t border-neutral-200 px-4 py-3 text-left text-sm font-medium hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
          >
            Search for "{query.trim()}"
          </button>
        </div>
      ) : null}
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

