import { SubmitHandler, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"

import { Button } from "../../../components/Button/Button.styles";
import { Input } from "../../../components/Input";
import { Link } from "../../../components/Link";
import { Logo } from "../../../components/Logo";
import { Container, FormContainer, Heading, InputContainer, LogoContainer } from "../Auth.styles";

const validationSchema = z.object({
    name: z.string().min(1, {message: "O nome é obrigatório"}),
    email: z.string().min(1, {message: "Email é obrigatório"}).email({message: "Insira um Email válido"}),
    password: z.string().min(8, {message: "A senha deve ter pelo menos 8 caracteres"})
})

type SignupForm = z.infer<typeof validationSchema>

export function Signup() {
    const {register, handleSubmit, formState: {errors}} = useForm<SignupForm>({
        resolver: zodResolver(validationSchema)
    })

    const onSubmit: SubmitHandler<SignupForm> = async(data)=>{
        console.log(data);
        
    } 

    return (
        <Container>
            <FormContainer>
                <LogoContainer>
                    <Logo/>
                </LogoContainer>
                <Heading>
                    <h1>Cadatres-se de graça</h1>
                    <p>Já tem um conta? {" "} <Link to="/">Entrar</Link></p>

                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <Input id="name" label="Nome Completo" type="text" error={errors.name?.message}{...register("name")}/>
                    </InputContainer>
                    <InputContainer>
                        <Input id="email" label="Email" type="email" error={errors.email?.message} {...register("email")}/>
                    </InputContainer>
                    <InputContainer>
                        <Input id="senha" label="Senha" type="password" error={errors.password?.message} {...register("password")}/>
                    </InputContainer>
                    <Button fullWidth>Entrar</Button>

                </form>

            </FormContainer>
        </Container>
    )
}
