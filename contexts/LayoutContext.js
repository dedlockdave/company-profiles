import React, { useState } from "react"

const init = {
    isMobileNavOpen: false,
    isLoginModalOpen: false,
}

export const LayoutContext = React.createContext(init)
export function LayoutProvider({children}) {
    let [layout, setLayout] = useState(init)
    return (
        <LayoutContext.Provider value={[layout, setLayout]} >
            {children}
        </LayoutContext.Provider>
    )
}