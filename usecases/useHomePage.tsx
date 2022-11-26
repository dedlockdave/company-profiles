import { useDragControls } from "framer-motion";
import { useContext, useEffect } from "react";
import { LayoutContext } from "../contexts/LayoutContext";
import { GetUser } from "../contexts/UserContext";

export function useHomePage() {
    let user = GetUser()
    let {layout, setLayout} = useContext(LayoutContext)!
    useEffect(() => {

        if (!user?.userID) {
            if (!layout.isLoginModalOpen) {
                setLayout({
                    ...layout,
                    isLoginModalOpen: true
                })
            }
            
        }
    }, [user, layout, setLayout])
    

    if (!user?.userID) {
        return {
            goToEdit: false
        }
    }

    if (!user.activities.length) {
        console.log("user act", user.activities)
        return {
            goToEdit: true
        }
    }

    return {
        goToEdit: false
    }
}