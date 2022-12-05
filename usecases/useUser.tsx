import { GetSession } from "../contexts/SessionContext"
import { GetUser } from "../contexts/UserContext"
import { supabase } from "../utils/supabase"
supabase


// function GetUserSession() {
    
//     return {session}
// }

export function useUserConnect() {
    let session = GetSession()
    let isLoggedIn = session?.user.role == "authenticated"
    let userName = session?.user.email

    const handleLogout = () => supabase.auth.signOut()

    return {
        isLoggedIn,
        userName,
        profileImage: "/images/seed.svg",
        handleLogout
    }
}

export function useGetUser() {
    let user = GetUser()
    return {
        user
    }
    
}

