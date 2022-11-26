import React, { useContext, useEffect, useState } from "react"
import { getUserCommitments } from "../entities/Activity"
import { User } from "../entities/User"

import { GetSession } from "./SessionContext"

export const UserContext = React.createContext<User>(new User())

export function UserProvider({children}: any) {
    let session = GetSession()
    let [user, setUser] = useState<User>()
    
    useEffect(() => {
        async function setupUser() {
            let uid = session!.user.id
            let activities = await getUserCommitments(uid)
            setUser(new User({
                userID: uid,
                activities
            }))
        }
        if (session) {
            setupUser()            
        }
    }, [session])
    
    if (!user) return children
    
    return (
        <UserContext.Provider value={user} >
            {children}
        </UserContext.Provider>
    )
}

export function GetUser() : User {
    return useContext(UserContext)
}