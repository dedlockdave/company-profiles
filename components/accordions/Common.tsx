import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { AccordionSummary } from "@mui/material"

export function Adder({handleAdd}: any) {
    return (
        <div className="flex items-center space-x-2">
                <AddCircleOutlineOutlinedIcon
                    onClick={handleAdd}
                    color="primary"
                />
                <span
                    onClick={handleAdd}
                    className="text-xs text-primary"
                >
                    NEW
                </span>
            </div>
    )
}

export function HHAccordion({ children }: any) {
    return (
        <AccordionSummary
            sx={{
                "& .MuiAccordionSummary-content": {
                    margin: "1.2em 0 1.2em 0",
                },
                borderBottom: "1px dotted #A8AABC",
            }}
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            {children}
        </AccordionSummary>
    )
}
