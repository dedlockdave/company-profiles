import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect } from "react"
import { fadeInAnimation } from "../../styles/animations"

const PopoverAnimated = ({ position, isOpen, handleClose, children }) => {
    // if (!isOpen) return null
    return (
        <AnimatePresence>
            <Backdrop isOpen={isOpen} position={position} onClick={handleClose} key="popoveranimated">
                <motion.div
                    className={`absolute ${position}`}
                    onClick={(e) => e.stopPropagation()}
                    {...fadeInAnimation}
                >
                    {children}
                </motion.div>
            </Backdrop>
        </AnimatePresence>
    )
}

const Backdrop = ({ isOpen, position, children, onClick }) => {
    let ref = useRef(null)

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClick()
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside, true)
        }
    })

    if (!isOpen) return null

    return (
        <motion.span
            ref={ref}
            onClick={onClick}
            className={`z-[10] rounded-xl py-3 text-div-grey ${position}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0  }}
        >
            {children}
        </motion.span>
    )
}

export default PopoverAnimated
