import { KeyboardEvent, useRef, useState } from "react";
import { Link } from "../Link";
import { SearchBox } from "../SearchBox";
import { SearchResultBook } from "../SearchResultBook/SearchResultBook";
import { Container, SearchResult, SearchResultBookContainer, SeeAllContainer } from "./Search.styles";
import { SearchLoader } from "./SearchLoader";
import { useOutsideInteraction } from "../../hooks/useOutsideInteraction";
import { useLazyBookQuery } from "../../hooks/useBooksQuery";
import { Book } from "../../models/Book";

interface ResultState {
    items: Book[]
}

export function Search (){

    const [search, setSearch] = useState("")
    const [showResult, setShowResult] = useState(false)
    const searchRef = useRef<HTMLDivElement | null>(null)
    const {fetch, data, isLoading} = useLazyBookQuery()

    const handleCloseResult = () => {
        setShowResult(false)
    }

    useOutsideInteraction(searchRef, handleCloseResult)

    const handleSearch = async ()=>{
        if(search){
            setShowResult(true)
            const maxResults = 3
            fetch({search, maxResults})
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === "Enter") {
            handleSearch()
        }
    }
    return(
        <Container ref={searchRef}>
            <SearchBox value={search} onChange={(e)=> setSearch(e.target.value)} onKeyDown={handleKeyPress}/>
            {showResult && (
                <SearchResult>
                    <span>resultado</span>
                    <SearchResultBookContainer>
                        {data && !isLoading ? (
                            data.items.map((item)=>(
                                <SearchResultBook key={item.id} book={item}/>
                            ))
                        ) : (<SearchLoader/>)}
                    </SearchResultBookContainer>
                    <SeeAllContainer>
                        <Link to={`/livros?q=${search}`}>Ver Todos</Link>
                    </SeeAllContainer>
                </SearchResult>
            )}
        </Container>
    )
}