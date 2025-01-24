import { useSearchParams } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { useBookQuery } from "../../hooks/useBooksQuery";
import { BookCard } from "../../components/BookCard";
import { BookList } from "./Books.styles";
import { BookLoader } from "./BookLoader";

export function Books () {
    const params = useSearchParams()
    const [searchParams] = params
    const q = searchParams.get("q") as string

    const {data, isLoading} = useBookQuery({
        search: q,
        maxResults: 20
    })
    return (
        <MainLayout>
            <div>Resultado da Busca</div>
            <BookList>
                {data && !isLoading ? (
                    data.items.map((item)=>(
                        <li key={item.id}>
                            <BookCard book={item}/>
    
                        </li>
                    ))
                ) : (
                    <BookLoader/>
                )}

            </BookList>
        </MainLayout>
    )
}