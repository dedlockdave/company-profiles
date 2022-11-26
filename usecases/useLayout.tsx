import { useContext } from "react"
import { LayoutContext } from "../contexts/LayoutContext"
import { outsideTrigger } from "../utils/effects"

export function useLoginModal() {
    let ctx = useContext(LayoutContext)
    let {layout, setLayout} = ctx!

    function closeModal() {
        layout.isLoginModalOpen && setLayout({...layout, isLoginModalOpen: false})
    }

    const openLoginModal = () => {
        setLayout({...layout, isLoginModalOpen: true})
    }

    return {
        isLoginModalOpen: layout.isLoginModalOpen,
        userLoggingIn: layout.userLoggingIn,
        closeModal,
        openLoginModal
    }
}

export function useMobileNav() {
    let ctx = useContext(LayoutContext)
    let {layout, setLayout} = ctx!
    
    let closeMobileNav = () => layout.isMobileNavOpen && setLayout({...layout, isMobileNavOpen: false})

    let toggleMenu = () => {
        setLayout({isMobileNavOpen: !layout.isMobileNavOpen})
    }
    
    let outsideRef = outsideTrigger(() => {
        layout.isMobileNavOpen && setLayout({...layout, isMobileNavOpen: false})
    })
    return {
        closeMobileNav,
        outsideRef,
        toggleMenu,
        isMobileNavOpen: layout.isMobileNavOpen,
    }
}