import { Button } from "@mui/material"


export default function Btn({children, className="", variant="contained", onClick}) {
    if (!className) {
        className = 'text-white'
    }
    return (
        <Button {...{className, variant, onClick}}>
            {children}
        </Button>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
