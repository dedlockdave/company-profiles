import React, { useContext, useState } from "react"

type Layout = {
    isMobileNavOpen: boolean,
    isLoginModalOpen: boolean,
    userLoggingIn: boolean,
}

type LayoutCtx = {
    layout: Layout
    setLayout: any
}

export const LayoutContext = React.createContext<LayoutCtx|undefined>(undefined)
export function LayoutProvider({children}:any) {
    let [layout, setLayout] = useState({
    isMobileNavOpen: false,
    isLoginModalOpen: false,
    userLoggingIn: false
    })

    return (
        <LayoutContext.Provider value={{layout, setLayout}} >
            {children}
        </LayoutContext.Provider>
    )
}
