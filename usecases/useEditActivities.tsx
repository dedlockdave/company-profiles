import { useEffect, useState } from "react"
import { GetUser, RefreshUser, RefreshUserFunc } from "../contexts/UserContext"
import { deleteUserActivity, upsertUserActivity } from "../entities/Activity"
import {sleep} from '../utils/utils'

import { Activity } from "../entities/Activity"
import {UserActivities} from "./useData"

export function activitiyProvider() {
    let user = GetUser()
    
    let {
        activities,
        setActivities,
    } = UserActivities(user?.userID)

    return {
        activities,
        setActivities
    }
}

export function useEditHabits() {
    let user = GetUser()
    let [habits, setHabits] = useState<Activity[]>()
    let refreshUser = RefreshUserFunc()

    useEffect(() => {
        setHabits(user?.activities.filter((a: Activity) => a.activity_type == "habit"))
    }, [user])

    const createNewHabit = (name="") => {
        let newHabit = new Activity({name})
        newHabit.activity_type = "habit"
        let a = [newHabit]
        if (habits?.length) a.push(...habits)
        
        setHabits(a)
    } 

    const removeActivityByName = (name : string) => {
        let acts = habits?.filter((a: Activity) => a.name != name)
        setHabits(acts)
    }

    const removeActivityByID = (id : string) => {
        let acts = habits?.filter((a: Activity) => a.id != id)
        setHabits(acts)
    }
    
    const editHabits = async (key: number, a: Activity) => {
        if (!habits) return
        
        let update = [...habits!] 
        update[key] = a
        setHabits(update)
        handleSave(update)
    }

    const handleSave = async (savehabits : Activity[]) => {
        try {
            if (savehabits) await upsertUserActivity(savehabits)
            refreshUser()
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
        }
    }


    return {
        createNewHabit,
        editHabits,
        handleSave,
        handleDelete,
        
        habits,
    }
}

export function useEditAbstains() {
    let user = GetUser()
    let refreshUser = RefreshUserFunc()

    let [abstains, setAbstains] = useState<Activity[]>()
    useEffect(() => {
        setAbstains(user?.activities.filter((a: Activity) => a.activity_type == "abstain"))
    }, [user])

    const createNewAbstain = (name="") => {
        let newAbstain = new Activity({name})
        newAbstain.activity_type = "abstain"
        let a = [newAbstain]
        if (abstains?.length) a.push(...abstains)
        setAbstains(a)
    } 

    const removeActivityByName = (name : string) => {
        let acts = abstains?.filter((a: Activity) => a.name != name)
        setAbstains(acts)
    }

    const removeActivityByID = (id : string) => {
        let acts = abstains?.filter((a: Activity) => a.id != id)
        setAbstains(acts)
    }
    
    const editAbstains = async (key: number, a: Activity) => {
        if (!abstains) return
        
        let update = [...abstains!] 
        update[key] = a
        setAbstains(update)
        handleSave(update)
    }

    const handleSave = async (saveabstains : Activity[]) => {
        try {
            if (saveabstains) await upsertUserActivity(saveabstains)
            refreshUser()
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
        }
    }


    return {
        createNewAbstain,
        editAbstains,
        handleSave,
        handleDelete,
        
        abstains,
    }
}

export function useNotification() {
    let [notification, setNotification] = useState<Notification>()
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

     return {
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