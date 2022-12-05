import {
    Accordion,
    AccordionDetails,
    TextField,
} from "@mui/material"
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined"
import ToggleDays from "./ToggleDays"

import { Activity } from "../../entities/Activity"
import { useEditAbstais } from "../../usecases/useEditAbstainss"
import { useGetUser } from "../../usecases/useUser"
import { Adder, HHAccordion } from "./Common"
import { accordionColor } from "../../utils/consts"
import { useEditAbstains } from "../../usecases/useEditActivities"

export function AbstainsAccordion() {
    return (
        <Accordion
                style={{ backgroundColor: accordionColor }}
                defaultExpanded
            >
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
            <span className="text-xs text-demph2">Things you want to do</span>
        </div>
    )
}

export function Body() {
    let { editAbstains, abstains, createNewAbstain, handleDelete } =
        useEditAbstains()

    return (
        <>
            <Adder handleAdd={createNewAbstain} />

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
        // setActivity(update)
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
                label="Goal"
                defaultValue={activity.name}
                onBlur={handleTextUpdate}
            />

            <ToggleDays init={activity.days} onSelect={handleDaysUpdate} />
        </div>
    )
}