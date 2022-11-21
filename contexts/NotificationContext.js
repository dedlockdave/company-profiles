import React, { useState } from "react"

const init = {
    message: "",
    type: ""
}

export const NotificationContext = React.createContext(init)

export function NotificationProvider({children}) {
    let [notification, setNotification] = useState()
    return (
        <NotificationContext.Provider value={[notification, setNotification]} >
            {children}
        </NotificationContext.Provider>
    )
}