import { useQuery } from "@tanstack/react-query";
import { MyBook } from "../models/MyBook";
import { api } from "../services/api";

export interface MyBooks {
    isReading: MyBook[]
    read: MyBook[]
    wantsToRead: MyBook[]
}

export async function fetchMyBooks (): Promise<MyBooks> {
    const {data} = await api.get("my-books")

    return data
}

export function useMyBooksQuery() {
    return useQuery({
        queryKey: ["my-books"],
        queryFn: fetchMyBooks
    })
}