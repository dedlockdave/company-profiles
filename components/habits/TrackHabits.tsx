import { FormControlLabel, Switch } from "@mui/material"
import { HeatMapGrid } from "react-grid-heatmap"

import TaskAltIcon from "@mui/icons-material/TaskAlt"
import DoNotDisturbTwoToneIcon from "@mui/icons-material/DoNotDisturbTwoTone"

import { ActivityCard } from "../../usecases/useMarkCompletion"
import { ActivityEntry, ActivityReport } from "../../entities/ActivityEntry"

import { useMarkCompletion } from "../../usecases/useMarkCompletion"
import { motion, MotionProps } from "framer-motion"
import moment from "moment"
import { CircularProgressWithLabel } from "../CircularProgressLabel"
import { Label } from "@mui/icons-material"

export function MarkCompletion() {
    let { habits, abstains, handleToggleSet } = useMarkCompletion()
    return (
        <div className="">
            <div className="space-y-6">
                <HabitsList {...{ habits, handleToggleSet }} />
                <AbstainList {...{ abstains, handleToggleSet }} />
            </div>
        </div>
    )
}

type EntryCardProps = {
    entry: ActivityEntry
    onToggle: (status: boolean) => void
    key: string
} & MotionProps

function HabitsList({ habits, handleToggleSet }: any) {
    return (
        <>
            <div className="space-x-4 text-center w-full">
                <div className="flex justify-center">
                    <TaskAltIcon sx={{ color: "#24C196" }} />
                    <p className="m-0 p-0">To Do List</p>
                </div>
            </div>

            <div className="space-y-4">
                {habits?.map((card: ActivityCard) => {
                    const onToggle = (status: boolean) =>
                        handleToggleSet(card.entry.user_activities_id, status)
                    return (
                        <HabitEntry
                            {...{ onToggle, card }}
                            transition={{ type: "tween", stiffness: 160 }}
                            key={card.entry.user_activities_id}
                        />
                    )
                })}
            </div>
        </>
    )
}

function HabitEntry({ card, onToggle, ...motionProps }: any) {
    let { entry, report } = card

    let gridRows, bgColor, fontColor, label, height, switchLabelColor

    switchLabelColor = "#A8AABC"
    if (entry.completed) {
        bgColor = "bg-success"
        label = "Done"
        height = "h-18"
        gridRows = "grid-rows-1"
    } else {
        gridRows = "grid-rows-[24%_76%]"
        bgColor = "bg-card4"
        label = "Mark Done"
        height = "h-40"
    }

    return (
        <motion.div
            layout
            {...motionProps}
            className={`-mx-4 py-4 px-6 grid grid-cols-[64%_36%] ${gridRows} ${height} items-center shadow-themed ${bgColor}`}
        >
            <ActivityToggle
                fontColor={fontColor}
                activityName={entry.activityName}
                completed={entry.completed}
                onToggle={onToggle}
                label={label}
                switchLabelColor={switchLabelColor}
            />

            {!entry.completed &&
                <div className="col-span-full">
                    <SuccessReport report={report} />
                </div>
            }
        </motion.div>
    )
}

function AbstainEntry({ card, onToggle, ...motionProps }: any) {
    let { entry, report } = card

    let rows, bgColor, switchLabelColor, fontColor, label, height
    switchLabelColor = "#A8AABC"
    if (entry.completed) {
        // rows = "grid-rows-1"
        // fontColor = "text-white"
        bgColor = "bg-card2"
        label = "Mark Cheat"
        height = "h-40"
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
            <ActivityToggle
                fontColor={fontColor}
                activityName={entry.activityName}
                completed={entry.completed}
                onToggle={onToggle}
                label={label}
                switchLabelColor={switchLabelColor}
            />
            {entry.completed &&
                <div className="col-span-full">
                    <SuccessReport report={report} />
                </div>
            }
        </motion.div>
    )
}

function AbstainList({ abstains, handleToggleSet }: any) {
    return (
        <>
            <div className="space-x-4 text-center w-full">
                <div className="flex justify-center">
                    <DoNotDisturbTwoToneIcon sx={{ color: "#9F7678" }} />
                    <p className="m-0 p-0">Abstain List</p>
                </div>
            </div>

            <div className="space-y-4">
                {abstains?.map((card: ActivityCard) => {
                    const onToggle = (status: boolean) =>
                        handleToggleSet(card.entry.user_activities_id, status)
                    return (
                        <AbstainEntry
                            key={card.entry.user_activities_id}
                            {...{ onToggle, card }}
                            transition={{ type: "tween", stiffness: 160 }}
                        />
                    )
                })}
            </div>
        </>
    )
}

function SuccessReport({ report }: any) {
    if(!report?.data.length) return (
        <p className="text-sm text-demph2 text-center">
            Historical data will show up here
        </p>
    )
    let showData = report.data.slice(-7) 

    let xLabels = showData.map((d : any)=> moment(d.entry_date).format("MMM Do"))
    return (
        <div className="grid grid-cols-[32%_68%] justify-between w-full">
            <div className="mx-auto">
                <CircularProgressWithLabel 
                    value={report.ratio*100}
                    sx={{
                        '& .MuiTypography-root': {color: "#24C196"}
                    }}
                />
                <p className="m-0 p-0 text-center text-xs text-demph2">
                    Since <br /> 
                    {moment(report.activity.created_time).format("MMM Do")}
                </p>
            </div>
            <HeatMapGrid 
                data={[showData]}
                xLabels={xLabels} 
                cellRender={(y, x, value) => <CompletionDataPoint {...{value}} />}
                xLabelsStyle={() => ({
                    margin: '5px',
                    fontSize: ".48rem"
                })}
                cellStyle={() => ({
                    borderRadius: '0',
                    border: "1px solid #CBCEEE",
                    margin: '.5px',
                })}
                cellHeight=".809rem"
                xLabelsPos="bottom"
            />
        </div>
    )
}

function CompletionDataPoint({value}: any) {
    let color
    if (moment(value.entry_date).isSame(new Date(), "day")) {
        color = "transparent"
    } else {
        color = value.completed ? "bg-success" :  "bg-warn"
    }

    return (
        <div className={`w-full h-full ${color}`}  />
    )

}

function ActivityToggle({
    fontColor,
    activityName,
    completed,
    onToggle,
    label,
    switchLabelColor,
}: any) {
    return (
        <>
            <span className={`${fontColor}`}>{activityName}</span>

            <FormControlLabel
                control={
                    <Switch
                        className="justify-self-end"
                        checked={completed}
                        onChange={() => onToggle(!completed)}
                    />
                }
                label={label}
                className="justify-self-end items-center"
                sx={{
                    // color: switchLabelColor,
                    textAlign: "center",
                    "& .MuiFormControlLabel-label": { fontSize: ".72em" },
                }}
                labelPlacement="bottom"
            />
        </>
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
