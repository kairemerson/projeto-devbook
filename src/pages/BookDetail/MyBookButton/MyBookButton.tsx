import { MouseEventHandler, ReactNode } from "react";
import CheckIcon from "../../../icons/check-simple.svg?react"
import { Container } from "./MyBookButton.styles";

interface MyBookButtonProps {
    children: ReactNode
    isSelected: boolean
    onAddBookList: MouseEventHandler<HTMLButtonElement>
    disabled: boolean
}

export function MyBookButton ({children, isSelected, onAddBookList, disabled}: MyBookButtonProps) {
    return(
        <Container variant={isSelected ? "default" : "outlined"} isSelected={isSelected} disabled={disabled} onClick={onAddBookList}> 
            {isSelected && <CheckIcon/>}
            {children}
        </Container>
    )
}