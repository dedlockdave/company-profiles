import { GetSession } from "../contexts/SessionContext"
import { GetUser } from "../contexts/UserContext"


// function GetUserSession() {
    
//     return {session}
// }

export function useUserConnect() {
    let session = GetSession()
    let isLoggedIn = session?.user.role == "authenticated"
    let userName = session?.user.email

    return {
        isLoggedIn,
        userName,
    }
}

export function useGetUser() {
    let user = GetUser()
    return {
        user
    }
    
}

