import { useState } from "react";
import { MyBook } from "../../models/MyBook";
import { generateThumbnailSrc } from "../../utils/generateThumbnailSrc";
import { Button } from "../Button";
import { ButtonsContainer, Details, InputContainer, PageCountText, ProgressBar, ProgressBarContainer, ReadingCard, Thumbnail } from "./ReadingBookCard.styles";
import { Input } from "../Input";
import { useUpdateReadingMutation } from "../../hooks/useUpdateReadingMutation";
import { Spinner } from "../Spinner";

interface ReadingBookCardProps {
    myBook: MyBook
}

export function ReadingBookCard ({myBook}: ReadingBookCardProps) {

    const [openUpdateReading, setOpenUpdateReading] = useState(false)
    const [page, setPage] = useState("")
    const {mutateAsync, isLoading} = useUpdateReadingMutation()

    const handleOpenUpdateReading = () => {
        setOpenUpdateReading(true)
        setPage("")
    }

    const handleCloseUpdateReading = () => {
        setOpenUpdateReading(false)
    }

    const handleUpdateReading = async () => {
        if(!page) return

        await mutateAsync({
            bookId: myBook.bookId,
            page : Number(page)
        })

        setOpenUpdateReading(false)
    }

    const currentPage = myBook.currentPage || 0
    const remainingPages = myBook.totalPages - currentPage
    const progress = Math.round((currentPage / myBook.totalPages) * 100)

    return (
        <ReadingCard>
            <Thumbnail src={generateThumbnailSrc({bookId: myBook.bookId})} alt={myBook.book.volumeInfo.title}/>
            
            <Details>
               {!openUpdateReading ? (
                    <>
                        <h2>{myBook.book.volumeInfo.title}</h2>
                        {myBook.book.volumeInfo.authors && (
                            <h3>{myBook.book.volumeInfo.authors[0]}</h3>
        
                        )}
        
                        <ProgressBarContainer>
                            <ProgressBar progress={progress}/>
                            <span>{progress}%</span>
                        </ProgressBarContainer>
        
                        <PageCountText>
                            Faltam {remainingPages} pág para terminar
                        </PageCountText>
        
                        <Button variant="outlined" size="small" fullWidth onClick={handleOpenUpdateReading}>
                            Atualizar Leitura
                        </Button>
                    
                    </>
               ) : (
                <>
                    <h2>Atualizar Leitura</h2>

                    <InputContainer>
                        <Input label="Página Atual" type="number" value={page} onChange={(e) => setPage(e.target.value)}/>
                    </InputContainer>

                    <ButtonsContainer>
                        <Button size="small" variant="outlined" fullWidth onClick={handleCloseUpdateReading}>Cancelar</Button>
                        <Button size="small" fullWidth onClick={handleUpdateReading} disabled={isLoading}>
                            {isLoading ? <Spinner size={20}/> : "Salvar"}
                        </Button>
                    </ButtonsContainer>
                
                </>
               )}

            </Details>
        </ReadingCard>
    )
}