import { FormControlLabel, Switch } from "@mui/material"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import MainArea4 from "../components/layoutV4/MainArea4"
import { useHomePage } from "../usecases/useHomePage"
import { useMarkCompletion } from "../usecases/useMarkCompletion"

export default function Home() {
    let router = useRouter()
    let { goToEdit } = useHomePage()
    useEffect(() => {
        if (goToEdit) {
            router.replace("/edit")
        }
    }, [goToEdit, router])

    return (
        <MainArea4>
            <MarkCompletion />
        </MainArea4>
    )
}

function MarkCompletion() {
    let { currentEntries, handleToggleSet } = useMarkCompletion()
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

            <div className="space-y-4">
                <h3 className="text-center text-demph m-0">
                    {moment().format("MMM Do YY")}
                </h3>
                {currentEntries?.map((a, i) => (
                    <ActivityEntryForm
                        entry={a}
                        onToggle={(status: any) => handleToggleSet(i, status)}
                        key={`toggleact${i}`}
                    />
                ))}
            </div>
        </div>
    )
}

function ActivityEntryForm({ entry, onToggle }: any) {
    let bgColor, switchLabelColor, fontColor, label
    if (entry.completed) {
        bgColor = "bg-card3"
        switchLabelColor = "#ffffff"
        fontColor = "text-white"
        label = "Done"
    } else {
        bgColor = "bg-card2"
        switchLabelColor = "#A8AABC"
        fontColor = "text-demph2"
        label = "Not Done"
    }

    return (
        <div
            className={`-mx-4 h-24 grid grid-cols-[64%_32%] items-center shadow-themed ${bgColor}`}
        >
            <p className={`text-right ${fontColor}`}>{entry.activtyName}</p>
            <FormControlLabel
                value="top"
                control={
                    <Switch
                        className="justify-self-end"
                        checked={entry.completed}
                        onChange={() => onToggle(!entry.completed)}
                    />
                }
                label={label}
                sx={{
                    color: switchLabelColor, 
                    fontSize: ".75em"
                }}
                labelPlacement="top"
            />
        </div>
    )
}
