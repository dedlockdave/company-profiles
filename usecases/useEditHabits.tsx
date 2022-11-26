import { useEffect, useState } from "react"
import { GetUser } from "../contexts/UserContext"
import { deleteUserActivity, upsertUserActivity } from "../entities/Activity"
import {sleep} from '../utils/utils'

import { Activity } from "../entities/Activity"
import {UserActivities} from "./common"

export function useEditHabits() {
    let user = GetUser()
    
    let [notification, setNotification] = useState<Notification>()

    let {
        activities,
        setActivities,
    } = UserActivities(user?.userID)

    const closeNotification = () => {
        let notification = {message: "", severity: "info", isOpen: false}
        setNotification(notification)
    }

     const openNotification = (message: string, severity: string) => {
        setNotification({
            isOpen: true,
            message,
            severity,
        })
     }
     
    const createNewActivity = () => {
        let a = [new Activity()]
        if (activities) a.push(...activities)
        setActivities(a)
    }

    const removeActivityByName = (name : string) => {
        let acts = activities?.filter(a => a.name != name)
        setActivities(acts)
    }

    const removeActivityByID = (id : string) => {
        let acts = activities?.filter(a => a.id != id)
        setActivities(acts)
    }
    
    const editActivities = async (key: number, a: Activity) => {
        if (!activities) return
        
        let update = [...activities!] 
        update[key] = a
        setActivities(update)
        handleSave(update)
    }

    const handleSave = async (saveActivities : Activity[]) => {
        try {
            if (saveActivities) await upsertUserActivity(saveActivities)
            // openNotification("Activity saved", "success")
        } catch (error) {
            let m = `something went wrong : ${error}`
            console.error(m)
            // openNotification(m, "warning")
        }
    }

    const handleDelete = async (activity: Activity) => {
        try {
            if (!activity.id) { // new activity no id so strip it
                removeActivityByName(activity.name)
            } else {
                await deleteUserActivity(activity.id)
                removeActivityByID(activity.id)
            }

            // openNotification("Activity deleted", "success")
        } catch (error) {
            let m = `could not delete ${error}`
            console.error(m)
            openNotification(m, "warning")
        }
    }


    return {
        createNewActivity,
        editActivities,
        handleSave,
        handleDelete,
        
        activities,

        notification,
        closeNotification,
    }
}

type Notification = {
    message: string
    severity: string
    isOpen: boolean
}



// export function useActivityEntry() {
//     let [activity, setActivity] = useState<Activity>(init)
//     let { user } = useGetUser()

//     const updateName = (activity) => {
//         let update = {
//             ...activity,
//             user_id: user.userID,
//             name: e.target?.value,
//         }
//         setActivity(update)
//         onChange(update)   
//     }

//     return {
//         activity,
//         updateName,
//     }

// }