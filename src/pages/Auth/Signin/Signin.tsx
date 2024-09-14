import { useState } from "react";
import { isAxiosError } from "axios";
import {SubmitHandler, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"

import { Button } from "../../../components/Button/Button.styles";
import { Input } from "../../../components/Input";
import { Link } from "../../../components/Link";
import { Logo } from "../../../components/Logo";
import { Container, FormContainer, Heading, InputContainer, LogoContainer } from "../Auth.styles";
import { useAuth } from "../../../hooks/UseAuth";
import { AlertBanner } from "../../../components/AlertBanner";
import { useError } from "../../../hooks/useError";

const validationSchema = z.object({
    email: z.string().min(1, {message: "Email é obrigatório"}).email({message: "Insira um Email válido"}),
    password: z.string().min(8, {message: "A senha deve ter pelo menos 8 caracteres"})
})

type SigninForm = z.infer<typeof validationSchema>

export function SignIn() {
    const {register, handleSubmit, formState: {errors}} = useForm<SigninForm>({
        resolver: zodResolver(validationSchema)
})

    const {signin} = useAuth()
    const {error, handleError, clearError} = useError()

    const onSubmit: SubmitHandler<SigninForm> = async(data)=>{
        try{
            clearError()
            await signin(data)

        }catch(error){
            handleError(error)
        }
        
    } 
    return (
        <Container>
            <FormContainer>
                <LogoContainer>
                    <Logo/>
                </LogoContainer>
                <Heading>
                    <h1>faça seu login</h1>
                    <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>

                </Heading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <Input id="email" label="Email" type="email" error={errors.email?.message} {...register("email")}/>
                    </InputContainer>
                    <InputContainer>
                        <Input id="senha" label="Senha" type="password" error={errors.password?.message} {...register("password")}/>
                    </InputContainer>
                    <Button fullWidth>Entrar</Button>
                    {error && <AlertBanner variant="success" message={error}/>}
                    
                </form>

            </FormContainer>
        </Container>
    )
}
