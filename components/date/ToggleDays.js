import React, { useState } from "react"
import { withStyles } from "@mui/styles"
import { styled } from "@mui/material/styles"
// import ToggleButton, {ToggleButtonProps} from "@mui/material";
// import ToggleButtonGroup, {ToggleButtonGroupProps} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { color } from "@mui/system"

const DAYS = [
    {
        key: "sunday",
        label: "S",
    },
    {
        key: "monday",
        label: "M",
    },
    {
        key: "tuesday",
        label: "T",
    },
    {
        key: "wednesday",
        label: "W",
    },
    {
        key: "thursday",
        label: "T",
    },
    {
        key: "friday",
        label: "F",
    },
    {
        key: "saturday",
        label: "S",
    },
]

const toggleButtonGroupStyles = {
    grouped: {
        margin: "4px",
        padding: "4px",
        "&:not(:first-of-type)": {
            border: "1px solid",
            borderColor: "#692B7C",
            borderRadius: "50%",
        },
        "&:first-of-type": {
            border: "1px solid",
            borderColor: "#692B7C",
            borderRadius: "50%",
        },
    },
}

const toggleButtonStyles = {
    color: "#A8AABC",
    // "&$selected": {
    //   color: "white",
    //   background: "#692B7C"
    // },
    // "&:hover": {
    //   borderColor: "#BA9BC3",
    //   background: "#BA9BC3"
    // },

    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem",
    focus: "none",
    selected: {},
    "&.Mui-selected": {
        backgroundColor: "#24C196",
        color: "#F1F1E6",
    },
}

const ToggleDays = ({onSelect, init}) => {
    const [days, setDays] = useState(translateDays(init))
    const handleSelect = (event, values) => {
        setDays(values)
        let out = [0, 0, 0, 0, 0, 0, 0].map((v, i) => {
            if (values.includes(i)) return 1
            return 0
        })
        onSelect(out)
    }

    return (
        <>
            <p className="text-xs mb-0">How Often?</p>
            <ToggleButtonGroup
                size="small"
                arial-label="Days of the week"
                value={days}
                onChange={handleSelect}
                sx={toggleButtonGroupStyles}
            >
                {DAYS.map((day, index) => (
                    <ToggleButton
                        sx={toggleButtonStyles}
                        key={day.key}
                        value={index}
                        aria-label={day.key}
                    >
                        {day.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </>
    )
}

const translateDays = (currentDays) => {
    let out = []
    currentDays.forEach((v, i) => {
        if (v== 1) out.push(i)
    })
    return out
}

export default ToggleDays
