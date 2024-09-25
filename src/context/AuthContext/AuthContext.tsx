import { createContext, PropsWithChildren, useState} from "react"
import { DEV_BOOLS_SESSION_KEY } from "../../constants/storage"
import { useSignin } from "../../hooks/useSignin"
import { useSignup } from "../../hooks/useSignup"

interface User {
    id: number
    name: string
    email: string
}

interface SigninUser {
    email: string
    password: string
}

interface SignupUser {
    name: string
    email: string
    password: string
}

export interface Session {
    user: User
    accessToken: string
    refreshToken: string
}

interface AuthContextType {
    isAuthenticated: boolean
    user?: User
    signin: (user: SigninUser) => Promise<void>
    signup: (user: SignupUser) => Promise<void>
    signout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)


export function AuthProvider ({children}: PropsWithChildren){

    const [session, setSession] = useState<Session | null>(() =>{
        const session = localStorage.getItem(DEV_BOOLS_SESSION_KEY)
        if(session){
            return JSON.parse(session)
        }
        return null
    })

    const signinMutation = useSignin()
    const signupMutation = useSignup()

    const signin = async (user: SigninUser): Promise<void>=>{
        await signinMutation.mutateAsync(user,{
            onSuccess: (session) => {
                setSession(session)
                localStorage.setItem(DEV_BOOLS_SESSION_KEY, JSON.stringify(session))
            }
        })
        
    }

    const signup = async (user: SignupUser): Promise<void>=>{
        await signupMutation.mutateAsync(user)
    }

    const signout = async (): Promise<void>=>{

    }
    return(
        <AuthContext.Provider value={{isAuthenticated: Boolean(session), user: session?.user, signin, signup, signout}}>
            {children}
        </AuthContext.Provider>
    )
}