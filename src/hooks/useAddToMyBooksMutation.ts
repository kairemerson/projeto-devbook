import { useMutation } from "@tanstack/react-query"
import { BookState } from "../models/BookState"
import { MyBook } from "../models/MyBook"
import { api } from "../services/api"

interface AddToMyBookMutationArgs {
    bookId: string
    bookState: BookState
}

export async function  addToMyBooks({bookState, bookId}: AddToMyBookMutationArgs): Promise<MyBook> {
    const {data} = await api.post<MyBook>("/books/my-books", {
        bookId, bookState
    })

    return data
}

export function useAddToMyBooksMutation() {
    return useMutation({
        mutationFn: async (data: AddToMyBookMutationArgs) => await addToMyBooks(data)
    })
}