import { useMutation } from "@tanstack/react-query"
import { api } from "../services/api"

interface SignupUser {
    name: string
    email: string
    password: string
}

async function signupUser({name, email, password}: SignupUser): Promise<void> {
    await api.post("/user/signup", {
        name, email, password
    })
}

export function useSignup(){
    return useMutation({mutationFn: (data: SignupUser)=> signupUser(data)})
}