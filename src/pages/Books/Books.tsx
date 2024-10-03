import { useSearchParams } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { useBookQuery } from "../../hooks/useBooksQuery";
import { BookCard } from "../../components/BookCard";

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
            <div>books</div>
            {data && !isLoading && data.items.map((item)=>(
                <BookCard key={item.id} book={item}/>
            ))}
        </MainLayout>
    )
}