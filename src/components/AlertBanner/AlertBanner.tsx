import { Container } from "./AlertBanner.styles"

import ExclamationCircle from "../../icons/exclamationCircle.svg?react"
import ExclamationTriangle from "../../icons/exclamationTriangle.svg?react"
import ExclamationCheck from "../../icons/check.svg?react"

export type AlertBannerVariantes = "success" | "error" | "warning"

interface AlertBannerProps {
    variant?: AlertBannerVariantes
    message: string
}

const icons = {
    success: ExclamationCheck,
    error: ExclamationCircle,
    warning: ExclamationTriangle
}

export function AlertBanner({variant="success", message}: AlertBannerProps){

    const Icon = icons[variant]

    return(
        <Container variant={variant}>
            <Icon/>
            {message}
        </Container>
    )
}