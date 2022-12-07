import React, { useContext, useEffect, useState } from "react"
import {v4 as uuidv4} from 'uuid';
import { fetchUserActivities } from "../entities/Activity"
import { User } from "../entities/User"

import { GetSession } from "./SessionContext"

export const UserContext = React.createContext<UserContext>({user: new User(), refreshUser: () => null})

type UserContext = {
    user: User
    refreshUser: ()=> void
}

export function UserProvider({children}: any) {
    let session = GetSession()
    let [user, setUser] = useState<UserContext>()
    let [nonce, setExecNonce] = useState("")
    const refreshUser = () => {
        setExecNonce(uuidv4())
    }
    
    useEffect(() => {
        async function setupUser() {
            let uid = session!.user.id
            let activities = await fetchUserActivities(uid)
            setUser({
                user: new User({userID: uid, activities}),
                refreshUser
            })
        }
        if (session) {
            setupUser()            
        }
    }, [session, nonce])
    
    if (!user) return children
    
    return (
        <UserContext.Provider value={user} >
            {children}
        </UserContext.Provider>
    )
}


export function RefreshUserFunc() {
    return useContext(UserContext).refreshUser
}

export function GetUser() : User {
    return useContext(UserContext).user
}