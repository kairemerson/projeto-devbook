import { useMutation } from "@tanstack/react-query"
import { api } from "../services/api"

interface User {
    id: number
    email: string
    name: string
}

interface SigninUser {
    email: string
    password: string
}

interface SigninResponse {
    user: User
    accessToken: string
    refreshToken: string
}

async function signinUser({email, password}:SigninUser): Promise<SigninResponse> {
    const { data } = await api.post<SigninResponse>("/user/signin", {
        email, password
    })
    return data
}

export function useSignin(){
    return useMutation({mutationFn: (data: SigninUser)=> signinUser(data)})
}