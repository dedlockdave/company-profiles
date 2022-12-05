import { useContext, useState } from "react"
import { LayoutContext } from "../contexts/LayoutContext"
import { outsideTrigger } from "../utils/effects"

export function useLoginModal() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    let ctx = useContext(LayoutContext)
    let {layout, setLayout} = ctx!

    function closeModal() {
        layout.isLoginModalOpen && setLayout({...layout, isLoginModalOpen: false})
    }

    const openLoginModal = () => setLayout({...layout, isLoginModalOpen: true})

    const openPopover = () => setIsPopoverOpen(true)
    const closePopover = () => setIsPopoverOpen(false)

    return {
        isLoginModalOpen: layout.isLoginModalOpen,
        userLoggingIn: layout.userLoggingIn,
        closeModal,
        openLoginModal,

        isPopoverOpen,
        openPopover,
        closePopover
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