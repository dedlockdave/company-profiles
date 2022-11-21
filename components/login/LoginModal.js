import { useContext } from "react"

import { createPortal } from "react-dom"
import LoginOpts from './LoginOpts'
import ModalAnimated from '../modalanimated/ModalAnimated'
import Loader from "../Loader"
import { LayoutContext } from "../../contexts/LayoutContext"
import { UserContext } from "../../contexts/UserContext"

export default function LoginModal() {
    let [{isLoginModalOpen}, setLayoutContext] = useContext(LayoutContext)
    let [{userLoggingIn}] = useContext(UserContext)

    function closeModal() {
        isLoginModalOpen && setLayoutContext({isLoginModalOpen: false})
    }

    let m = (
        isLoginModalOpen && 
        <ModalAnimated isOpen={isLoginModalOpen} handleClose={() => {
            closeModal()
        }}>
            {userLoggingIn ? <Loader text="Connecting.." /> : <LoginOpts handleClose={closeModal} />}
        </ModalAnimated>
    )

    if (typeof window == "undefined") {
        return null
    }

    const target = document && document.body
    return createPortal(m, target)
}