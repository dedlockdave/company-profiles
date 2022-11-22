import { Button } from "@mui/material"


export default function Btn({children, className, variant, onClick}) {
    if (!className) {
        className = 'text-white'
    }

    return (
        <Button {...{className, variant, onClick}}>
            {children}
        </Button>
    )
}
