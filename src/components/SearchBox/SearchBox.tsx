import { Container } from "./SearchBox.styles";
import SearchSvg from "../../icons/search.svg?react"
import { InputHTMLAttributes } from "react";

type SearchBoxProps = InputHTMLAttributes<HTMLInputElement>

export function SearchBox (props: SearchBoxProps){
    return(
        <Container>
            <SearchSvg/>
            <input placeholder="Encontre seu livro favorito" {...props} />
        </Container>
    )
}