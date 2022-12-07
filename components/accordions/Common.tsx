import {
    Accordion,
    AccordionDetails,
    Button,
    ButtonGroup,
    TextField,
} from "@mui/material"
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined"
import ToggleDays, { translateDays } from "./ToggleDays"

import { Activity } from "../../entities/Activity"
import { useGetUser } from "../../usecases/useUser"
import { accordionColor } from "../../utils/consts"
import { useEditAbstains } from "../../usecases/useEditActivities"
import { useState } from "react"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { AccordionSummary } from "@mui/material"

export function Adder({ handleAdd }: any) {
    return (
        <div className="flex items-center space-x-2">
            <AddCircleOutlineOutlinedIcon onClick={handleAdd} color="primary" />
            <span onClick={handleAdd} className="text-xs text-primary">
                NEW
            </span>
        </div>
    )
}

export function SuggestionAdd({ options, handleSelect }: any) {
    return (
        <div className="flex flex-col flex-center text-center w-full">
            <span className="w-full my-2 text-demph2 text-center">
                Try:{" "}
            </span>
            {options.map((opt: string) => (
                <span
                    onClick={() => handleSelect(opt)}
                    key={opt}
                    className="cursor-hover w-full text-primary text-center"
                >
                    {opt}
                </span>
            ))}
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
export function PickFrequency({ days, handleDaysUpdate }: any) {
    let [freq, setFreq] = useState("")

    return (
        <div>
            <p className="text-xs mb-0">How Often?</p>
            <ButtonGroup size="small" variant="text">
                <FreqButton
                    label={"Daily"}
                    isSelected={freq == "Daily"}
                    onClick={(selected: string) => {
                        setFreq(selected)
                        handleDaysUpdate([1, 1, 1, 1, 1, 1, 1])
                    }}
                />
                <FreqButton
                    label={"Weekdays"}
                    isSelected={freq == "Weekdays"}
                    onClick={(selected: string) => {
                        handleDaysUpdate([0, 1, 1, 1, 1, 1, 0])
                        setFreq(selected)
                    }}
                />
                <FreqButton
                    label={"Choose"}
                    isSelected={freq == "Choose"}
                    onClick={(selected: string) => {
                        setFreq(selected)
                        handleDaysUpdate([0, 0, 0, 0, 0, 0, 0])
                    }}
                />
            </ButtonGroup>
            <ToggleDays days={days} onSelect={handleDaysUpdate} />
        </div>
    )
}

function FreqButton({ label, isSelected, onClick }: any) {
    if (isSelected) return <Button onClick={onClick}>{label}</Button>
    return (
        <Button sx={{ color: "#A8AABC" }} onClick={() => onClick(label)}>
            {label}
        </Button>
    )
}
