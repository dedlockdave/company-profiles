import React, { useState } from "react"

const init = {
    userLoggingIn: false,
    user: {}

}

export const UserContext = React.createContext(init)

export function UserProvider({children}) {
    let [user, setUser] = useState(init)
    return (

        <UserContext.Provider value={[user, setUser]} >
            {children}
        </UserContext.Provider>
    )
}