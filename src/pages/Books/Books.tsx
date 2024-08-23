import { useEffect, useState } from "react"
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom"
import { googleBooksApi } from "../../services/googleBooksApi"
import { Thumbnail } from "../../components/SearchBox/Thumbnail/Thumbnail"

import {BookState as Book} from "../BookDetail"

import {Container, Subtitle, Title} from "./Books.styles"
import { Spinner } from "../../components/SearchBox/Spinner"


interface BookState {
    totalItems: number
    items: Book[]
}

export function Books(){
    const[books, setBooks] = useState<BookState | null>(null)
    const params = useSearchParams()
    const [searchParams] = params
    const location = useLocation()

    const q = searchParams.get("q")
    

    useEffect(()=>{
        googleBooksApi.get(`/v1/volumes?q=${q}&maxResults=20`)
            .then((response)=>{setBooks(response.data)})
    },[q])

    if(!q ){
        return <Navigate to="/" state={{from: location}} replace/>
    }
    return (
        <Container>
            <h1>Resultados da sua busca</h1>

            {books ? (
                <ul>
                    {books.items.map((book)=>(
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`}>
                                <Thumbnail thumbnail={book.volumeInfo.imageLinks?.thumbnail} 
                                    title={book.volumeInfo.title}
                                    bgColor="#d9d9d9"    
                                />
                                <Title>{book.volumeInfo.title}</Title>
                                <Subtitle>{book.volumeInfo.subtitle}</Subtitle>
                            </Link>
                        </li>
                    ))}
                </ul>
            ): (
                <Spinner/>

            )}
        </Container>
    )
}