import Photo from "../../../icons/photo.svg?react"
import { Container } from "./Thumbnail.styles"

interface ThumbnailProps {
    thumbnail?: string
    title: string
    size?: "small" | "large"
    bgColor: string
}

export function Thumbnail({thumbnail, size= "small", title, bgColor}: ThumbnailProps){
    return (
        <Container bgColor={bgColor} size={size}>
            {thumbnail ? <img src={thumbnail} alt={title}/> : <Photo/>}
        </Container>
    )
}