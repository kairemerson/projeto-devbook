import { KeyboardEvent, useState } from "react";
import { Link } from "../Link";
import { SearchBox } from "../SearchBox";
import { Book, SearchResultBook } from "../SearchResultBook/SearchResultBook";
import { Container, SearchResult, SearchResultBookContainer, SeeAllContainer } from "./Search.styles";
import { api } from "../../services/api";



interface ResultState {
    items: Book[]
}

export function Search (){

    const [search, setSearch] = useState("")
    const [result, setResult] = useState<ResultState | null>(null)
    const [loading, setLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const handleSearch = async ()=>{
        if(search){
            setLoading(true)
            setShowResult(true)
            const maxResults = 3
            const {data} = await api.get(`/books?q=${search}&maxResults=${maxResults}`)

            setResult(data);
            setLoading(false)
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === "Enter") {
            handleSearch()
        }
    }
    return(
        <Container>
            <SearchBox value={search} onChange={(e)=> setSearch(e.target.value)} onKeyDown={handleKeyPress}/>
            {showResult && (
                <SearchResult>
                    <span>resultado</span>

                    <SearchResultBookContainer>
                        {result && !loading ? (
                            result.items.map((item)=>(
                                <SearchResultBook key={item.id} book={item}/>
                            ))
                        ) : (<span>carregando</span>)}
                    </SearchResultBookContainer>
                    <SeeAllContainer>
                        <Link to="/livros">Ver Todos</Link>
                    </SeeAllContainer>
                </SearchResult>
            )}
        </Container>
    )
}