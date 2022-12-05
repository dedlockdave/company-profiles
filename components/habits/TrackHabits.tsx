import { FormControlLabel, Switch } from "@mui/material"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import DoNotDisturbTwoToneIcon from "@mui/icons-material/DoNotDisturbTwoTone"
import moment from "moment"
import Link from "next/link"
import { ActivityEntry } from "../../entities/ActivityEntry"

import { useMarkCompletion } from "../../usecases/useMarkCompletion"
import { motion, MotionProps } from "framer-motion"

export function MarkCompletion() {
    let { habits, abstains, handleToggleSet } = useMarkCompletion()
    return (
        <div className="">
            <div className="mb-4">
                <p className="m-0">Track your Commitments</p>
                <Link href="/edit">
                    <p className="m-0 font-bold underline text-sm text-demph ">
                        Edit
                    </p>
                </Link>
            </div>
            <div className="space-y-6">
                <h3 className="text-center text-demph m-0">
                    {moment().format("MMM Do YY")}
                </h3>
                <HabitsList {...{ habits, handleToggleSet }} />
                <AbstainList {...{ abstains, handleToggleSet }} />
            </div>
        </div>
    )
}


function HabitsList({ habits, handleToggleSet }: any) {
    return (
        <>
            <div className="space-x-4 text-demph text-center w-full">
                <div className="flex justify-center">
                    <TaskAltIcon sx={{ color: "#24C196" }} />
                    <p className="m-0 p-0">To Do List</p>
                </div>
            </div>

            <div className="space-y-4">
                {habits?.map((entry: ActivityEntry) => {
                    const onToggle = (status: boolean) =>
                        handleToggleSet(entry.user_activities_id, status)
                    return (
                        <HabitEntry
                            key={entry.user_activities_id}
                            {...{ onToggle, entry }}
                            transition={{ type: "tween", stiffness: 160 }}
                        />
                    )
                })}
            </div>
        </>
    )
}

type EntryCardProps = {
    entry: ActivityEntry
    onToggle: (status: boolean) => void
    key: string
} & MotionProps

function HabitEntry({ entry, onToggle, ...motionProps }: any) {
    let rows, bgColor, switchLabelColor, fontColor, label, height

    switchLabelColor = "#A8AABC"
    if (entry.completed) {
        bgColor = "bg-card3"
        // fontColor = "text-white"
        label = "Done"
        height = "h-18"
        rows = "grid-rows-1"
    } else {
        bgColor = "bg-card4"
        label = "Mark Done"
        // fontColor = "text-demph2"
        height = "h-18"
    }

    return (
        <motion.div
            layout
            {...motionProps}
            className={`-mx-4 py-3 px-6 grid grid-cols-[64%_36%] ${height} items-center shadow-themed ${bgColor}`}
        >
            <span className={`${fontColor}`}>
                {entry.activtyName}
            </span>

            <FormControlLabel
                control={
                    <Switch
                        className="justify-self-end"
                        checked={entry.completed}
                        onChange={() => onToggle(!entry.completed)}
                    />
                }
                label={label}
                className="justify-self-end"
                sx={{
                    color: switchLabelColor,
                    textAlign: "center",
                    "& .MuiFormControlLabel-label": {fontSize: ".72em"}
                }}
                labelPlacement="bottom"
            />
        </motion.div>
    )
}

function AbstainList({ abstains, handleToggleSet }: any) {
    return (
        <>
            <div className="space-x-4 text-demph text-center w-full">
                <div className="flex justify-center">
                    <DoNotDisturbTwoToneIcon sx={{ color: "#9F7678" }} />
                    <p className="m-0 p-0">Abstain List</p>
                </div>
            </div>

            <div className="space-y-4">
                {abstains?.map((entry: ActivityEntry) => {
                    const onToggle = (status: boolean) =>
                        handleToggleSet(entry.user_activities_id, status)
                    return (
                        <AbstainEntry
                            key={entry.user_activities_id}
                            {...{ onToggle, entry }}
                            // positionTransition={{
                            //     type: "tween",
                            //     ease: "easeInOut",
                            // }}
                            transition={{ type: "tween", stiffness: 160 }}
                        />
                    )
                })}
            </div>
        </>
    )
}


function AbstainEntry({ entry, onToggle, ...motionProps }: any) {
    let rows, bgColor, switchLabelColor, fontColor, label, height
    switchLabelColor = "#A8AABC"
    if (entry.completed) {
        // rows = "grid-rows-1"
        // fontColor = "text-white"
        bgColor = "bg-card3"
        label = "Mark Cheat"
        height = "h-18"
    } else {
        bgColor = "bg-warn"
        label = "Cheated"
        // fontColor = "text-demph2"
        // label = "Mark Done"
        height = "h-18"
    }

    return (
        <motion.div
            layout
            {...motionProps}
            className={`-mx-4 py-3 px-6 grid grid-cols-[64%_36%] ${height} items-center shadow-themed ${bgColor}`}
        >
            <span className={`${fontColor}`}>
                {entry.activtyName}
            </span>

            <FormControlLabel
                control={
                    <Switch
                        className="justify-self-end"
                        checked={entry.completed}
                        onChange={() => onToggle(!entry.completed)}
                    />
                }
                label={label}
                className="justify-self-end"
                sx={{
                    color: switchLabelColor,
                    textAlign: "center",
                    "& .MuiFormControlLabel-label": {fontSize: ".72em"}
                }}
                labelPlacement="bottom"
            />
        </motion.div>
    )
}


// function CompletedCard({ entry, onToggle }: any) {
//     if (!entry || !entry.completed) {
//         console.error("check entry : ", entry)
//         return null
//     }

//     return <Header {...{entry, fontColor, onToggle, label}} />
// }

// function NotCompletedCard({ entry, onToggle }: any) {
//     if (!entry || entry.completed) {
//         console.error("check entry : ", entry)
//         return null
//     }

//     let bgColor, fontColor, label, switchLabelColor

//     return (
//         <Header {...{entry, fontColor, onToggle, label}} />
//     )
// }

// function Header({entry, fontColor, onToggle, label, switchLabelColor}: any) {

//     return (

//     )
// }
