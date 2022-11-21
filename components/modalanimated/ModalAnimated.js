/* eslint-disable react/no-unknown-property */
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect } from "react"
import styles from "./modal-animated.module.css"
import { dropInAnimation } from "../../styles/animations"
import { useScreenSize } from "../../utils/effects"

const ModalAnimated = ({ isOpen, handleClose, children }) => {
    return (
        <AnimatePresence>
            <Backdrop isOpen={isOpen} onClick={handleClose} key="HELPME">
                <motion.div
                    className={styles.modalContainer}
                    onClick={(e) => e.stopPropagation()}
                    {...dropInAnimation}
                >
                    {children}
                </motion.div>
            </Backdrop>
        </AnimatePresence>
    )
}

// const Modal = ({ handleClose, children }) => {
//   return (

//   );
// };

const Backdrop = ({ isOpen, children, onClick }) => {
    let ref = useRef(null)
    let screenSize = useScreenSize()

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClick()
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
        document.addEventListener("scroll", () => onClick())
        return () => {
            document.removeEventListener("click", handleClickOutside, true)
            document.removeEventListener("scroll", () => onClick())
        }
    }, [])

    if (!isOpen) return null

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={styles.modalBackdrop}
            style={{
                opacity: 1,
                left: screenSize != "large" ? "12%" : "30%",
                right: screenSize != "large" ? "12%" : "30%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0  }}
        >
            {children}
        </div>
    )
}

export default ModalAnimated
