import { useDragControls } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../contexts/LayoutContext";
import { GetUser } from "../contexts/UserContext";
import { getRandomQuote, Quote } from "../entities/Quote";

export function useHomePage() {
    let user = GetUser()
    let {layout, setLayout} = useContext(LayoutContext)!
    let [quote, setQuote] = useState<Quote>()
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
    

    useEffect(()=> {
        async function setup() {
            setQuote(await getRandomQuote())
        }
        setup()
    }, [])

    if (!user?.userID) {
        return {
            goToEdit: false
        }
    }

    if (!user.activities.length) {
        return {
            goToEdit: true
        }
    }

    return {
        quote: quote,
        goToEdit: false
    }
}