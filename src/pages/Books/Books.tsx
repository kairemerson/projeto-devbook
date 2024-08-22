import { useEffect, useState } from "react"
import { Navigate, useLocation, useSearchParams } from "react-router-dom"
import { googleBooksApi } from "../../services/googleBooksApi"
import { Thumbnail } from "../../components/SearchBox/Thumbnail/thumbnail"

import {Container, Subtitle, Title} from "./Books.styles"

interface Book{
    id: string
    volumeInfo: {
        title: string
        subtitle: string
        description: string
        imageLinks?: {
            thumbnail: string
        }
    }
}

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
            {books && (
                <ul>
                    {books.items.map((book)=>(
                        <li key={book.id}>
                            <Thumbnail thumbnail={book.volumeInfo.imageLinks?.thumbnail} 
                                title={book.volumeInfo.title}
                                bgColor="#d9d9d9"    
                            />
                            <Title>{book.volumeInfo.title}</Title>
                            <Subtitle>{book.volumeInfo.subtitle}</Subtitle>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    )
}