import { KeyboardEvent, useState } from "react";
import { Link } from "../Link";
import { SearchBox } from "../SearchBox";
import { Container, SearchResult, SearchResultBookContainer, SeeAllContainer } from "./Search.styles";
import { api } from "../../services/api";

interface BookItem {
    id: string
    volumeInfo: {
        title: string
        description: string
        imageLinks?: {
            thumbnail: string
        }
        authors: string
    }
}

interface ResultState {
    items: BookItem[]
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
                                <span key={item.id}>{item.volumeInfo.title}</span>
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