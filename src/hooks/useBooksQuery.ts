import { useQuery } from "@tanstack/react-query"
import { api } from "../services/api"
import { useState } from "react"
import { Book } from "../models/Book"

interface BooksQueryResponse {
    totalItems: number
    items: Book[]
}

interface BookQueryArgs {
    search: string
    maxResults: number
}

async function fetchBooks({search, maxResults}: BookQueryArgs) : Promise<BooksQueryResponse>{
    const {data} = await api.get<BooksQueryResponse>(`/books?q=${search}&maxResults=${maxResults}`)
    return data
}

export function useBookQuery ({search, maxResults}: BookQueryArgs){
    return useQuery({
        queryKey: ["books", search, maxResults],
        queryFn: async () => await fetchBooks({search, maxResults}),
        staleTime: Infinity
    })
}

export function useLazyBookQuery () {
    const [variables, setVariables] = useState<BookQueryArgs | null>(null)

    const query = useQuery({
        queryKey: ["lazy-books", variables],
        queryFn: async () => await fetchBooks(variables as BookQueryArgs),
        enabled: Boolean(variables)
    })

    const fetch = (queryVariables: BookQueryArgs) => {
        setVariables(queryVariables)
    }

    return {
        fetch,
        ...query
    }
}
