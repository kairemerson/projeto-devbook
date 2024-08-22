import { Container } from "./SearchBox.styles";
import SearchIcon from "../../icons/search.svg?react";
import { InputHTMLAttributes } from "react";

type SearchBoxProps = InputHTMLAttributes<HTMLInputElement>

export function SearchBox(props: SearchBoxProps) {
    return(
        <Container>
            <SearchIcon/>
            <input type="text" {...props} />
        </Container>
        
    ) 
}