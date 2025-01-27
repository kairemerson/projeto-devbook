import { useMutation, useQueryClient } from "@tanstack/react-query"
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
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: AddToMyBookMutationArgs) => 
            await addToMyBooks(data),
        onMutate: async(data) => {
            await queryClient.cancelQueries({
                queryKey: ["book-details", data.bookId]
            })

            const previusBookDetail = queryClient.getQueryData(["book-details", data.bookId])

            queryClient.setQueryData(["book-details", data.bookId], (oldData)=>{
                return oldData ? { ...oldData, bookState: data.bookState} : oldData
            })

            return {previusBookDetail, data}
        },
        onError: (error, data, context) => {
            const bookDetailKey = ["book-details", context?.data.bookId]

            queryClient.setQueryData(bookDetailKey, context?.previusBookDetail)
        },
        onSettled: (data) => {
            const bookDetailKey = ["book-details", data?.bookId]

            queryClient.invalidateQueries({queryKey: bookDetailKey})
        }
    })
}