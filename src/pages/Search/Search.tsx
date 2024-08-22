import {Container, SearchButton, SearchContainer} from './Search.styles'

import { SearchBox } from "../../components/SearchBox"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Search(){
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSearch = () => {
        if(search){
            navigate(`/books?q=${search}`)
        }
    }
    return (
        <Container>
            <h1>Busque seu livros!</h1>
            <SearchContainer>
                <SearchBox value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)}/>
                <SearchButton onClick={handleSearch}>Buscar</SearchButton>
            </SearchContainer>
        </Container>
    )
}