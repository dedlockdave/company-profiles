import {
    Snackbar,
} from "@mui/material"
import Link from "next/link"
import { useNotification } from "../usecases/useEditActivities"
import MainArea4 from "../components/layoutV4/MainArea4"
import { HabitAccordion } from "../components/accordions/Habits"
import { AbstainsAccordion } from "../components/accordions/Abstains"


export default function EditForm() {
    let { notification, closeNotification } = useNotification()

    return (
        <MainArea4>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="m-0">Edit your Commitments</p>
                    <Link href="/">
                        <p className="m-0 font-bold underline text-sm text-demph ">
                            Go To Track
                        </p>
                    </Link>
                </div>
            </div>
            
            <HabitAccordion />
            <AbstainsAccordion />

            <Snackbar
                open={notification?.isOpen}
                autoHideDuration={4800}
                onClose={closeNotification}
                message={notification?.message}
            >
                <div className="bg-bg w-full">
                    <p className="text-success text-right">
                        {notification?.message}
                    </p>
                </div>
            </Snackbar>
        </MainArea4>
    )
}



