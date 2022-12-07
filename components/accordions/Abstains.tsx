import {
    Accordion,
    AccordionDetails,
    TextField,
} from "@mui/material"
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined"

import { Activity } from "../../entities/Activity"
import { useGetUser } from "../../usecases/useUser"
import { Adder, HHAccordion, PickFrequency, SuggestionAdd } from "./Common"
import { accordionColor } from "../../utils/consts"
import { useEditAbstains } from "../../usecases/useEditActivities"
import { useState } from "react"

export function AbstainsAccordion() {
    return (
        <Accordion style={{ backgroundColor: accordionColor }} defaultExpanded>
            <HHAccordion>
                <Header />
            </HHAccordion>

            <AccordionDetails>
                <Body />
            </AccordionDetails>
        </Accordion>
    )
}

export function Header() {
    return (
        <div className="grid grid-cols-[3fr_7fr] items-center w-full">
            <div className="">
                <span className="mr-16">Abstains</span>
            </div>
            <span className="text-xs text-demph2">
                Things you want to avoid
            </span>
        </div>
    )
}

export function Body() {
    let { editAbstains, abstains, createNewAbstain, handleDelete } =
        useEditAbstains()

    return (
        <>

            <Adder handleAdd={()=>createNewAbstain("")} />
            {!abstains?.length && 
                <SuggestionAdd handleSelect={(opt: any)=>createNewAbstain(opt)} options={["Sweets", "Alcohol", "Marijuana"]} />
            }

            <div className="space-y-4">
                {abstains?.map((m, i) => (
                    <AbstainsForm
                        key={`activity${m.id || m.name}${i}`}
                        index={i}
                        onMinusPress={handleDelete}
                        onChange={(update: Activity) => {
                            editAbstains(i, update)
                        }}
                        activity={m}
                    />
                ))}
            </div>
        </>
    )
}


export function AbstainsForm({ onChange, onMinusPress, activity }: any) {
    let { user } = useGetUser()
    let [days, setDays] = useState(activity.days)
    // let [activity, setActivity] = useState<Activity>(init)

    const handleTextUpdate = (e: any) => {
        let update = {
            ...activity,
            user_id: user.userID,
            name: e.target?.value,
        }
        // setActivity(update)
        onChange(update)
    }

    const handleDaysUpdate = (values: number[]) => {
        let update = {
            ...activity,
            user_id: user.userID,
            days: values,
        }
        setDays(values)
        onChange(update)
    }

    if (!activity) return null

    return (
        <div className="space-y-2">
            <div className="w-full text-right">
                <RemoveCircleOutlineOutlinedIcon
                    onClick={() => onMinusPress(activity)}
                    className="relative top-3"
                    color="warning"
                />
            </div>
            <TextField
                required
                className="w-full"
                id="standard-required"
                label="What you want to avoid"
                defaultValue={activity.name}
                onBlur={handleTextUpdate}
            />

            <PickFrequency days={days} handleDaysUpdate={handleDaysUpdate} />
        </div>
    )
}

