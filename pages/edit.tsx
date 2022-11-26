import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AlertColor,
    Snackbar,
    TextField,
} from "@mui/material"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined"
import ExpandMore from "@mui/icons-material/ExpandMore"
import Link from "next/link"
import ToggleDays from "../components/date/ToggleDays"
import { Activity } from "../entities/Activity"
import {  useEditHabits } from "../usecases/useEditHabits"
import { useGetUser } from "../usecases/useUser"
import Btn from "../components/general/Btn"
import MainArea4 from "../components/layoutV4/MainArea4"
import { convertCompilerOptionsFromJson } from "typescript"

export default function EditForm() {
    let {
        editActivities,
        activities,
        createNewActivity,
        handleDelete,

        notification,
        closeNotification,
    } = useEditHabits()

    return (
        <MainArea4>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="m-0">Edit your Commitments</p>
                    <Link href="/"><p className="m-0 font-bold underline text-sm text-demph ">Go To Track</p></Link>
                </div>
            </div>
            <Accordion style={{ backgroundColor: "#6B4648" }} defaultExpanded>
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
                    <div className="flex flex-row items-center">
                        <div className="">
                            <span className="mr-16">Activities</span>
                        </div>
                        <span className="text-xs text-demph2">
                            Things you want to do
                        </span>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div
                        className="flex items-center space-x-2"
                    >
                        <AddCircleOutlineOutlinedIcon onClick={createNewActivity} color="primary" />
                        <span onClick={createNewActivity} className="text-xs text-primary">NEW</span>
                    </div>

                    <div className="space-y-4">
                        {activities?.map((m, i) => (
                            <ActivityEntry
                                key={`activityii${m.id || m.name}${i}`}
                                index={i}
                                onMinusPress={handleDelete}
                                onChange={(update: Activity) => {
                                    editActivities(i, update)
                                }}
                                activity={m}
                            />
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Snackbar
                open={notification?.isOpen}
                autoHideDuration={4800}
                onClose={closeNotification}
                message={notification?.message}
            >
                <div className="bg-bg w-full">
                    <p className="text-success text-right">{notification?.message}</p>
                </div>
                {/* <Alert
                    onClose={closeNotification}
                    severity={notification?.severity as AlertColor}
                    sx={{ 
                        width: "100%" ,
                        backgroundColor: "#4A4E69",
                        color: "white"
                    }}
                >
                    
                </Alert> */}
            </Snackbar>
        </MainArea4>
    )
}

function ActivityEntry({ onChange, onMinusPress, activity }: any) {
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
