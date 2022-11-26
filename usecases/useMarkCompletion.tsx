// import { useDragControls } from "framer-motion";
// import { useContext } from "react";
// import { LayoutContext, SetLoginModal } from "../contexts/LayoutContext";

import { useEffect, useState } from "react";
import { GetDateScope } from "../contexts/CommitmentsContext";
import { GetUser } from "../contexts/UserContext";
import { ActivityEntry, insertUserActivityEntries } from "../entities/ActivityEntry";
import {UserActivities, UserActivitiesEntries } from "./common";

export function useMarkCompletion() {
    let [currentEntries, setCurrentEntries] = useState<ActivityEntry[]>([] as ActivityEntry[])
    let currentDate = GetDateScope()
    let user = GetUser()

    let {activities} = UserActivities(user?.userID)
    let {activitiesEntries} = UserActivitiesEntries(user?.userID, currentDate!)

    useEffect(() => {
        let out : ActivityEntry[] = []

        // if activites present, use that, otherwise use something
        activities?.forEach(activity => {
            let entry = activitiesEntries?.find(ae => ae.user_activities_id == activity.id)
            if (entry) {
                entry.activtyName = activity.name
                out.push(entry!)
            } else {
                out.push(new ActivityEntry({
                    user_id: user.userID,
                    user_activities_id: activity.id,
                    activtyName: activity.name,
                    created_at: currentDate!,
                }))
            }
        })

        setCurrentEntries(out)
    }, [activities, activitiesEntries, currentDate, user.userID])

    const handleToggleSet = (index : number, completion : boolean) => {
        try {

            if (!currentEntries) return null
            let update = [...currentEntries] as ActivityEntry[]
            console.log('handlt typ', typeof update)
            update[index].completed = completion
            insertUserActivityEntries(update as ActivityEntry[])
            setCurrentEntries(update)
        } catch (error) {
            // set notificaiton if we fuck p
            
        }
    }

    
    // if (!activities) return {}
    
    // let activityEntries = activities.map(a => new ActivityEntry({
    //     user_id: user.userID,
    //     user_activities_id: a.id,
    //     activtyName: a.name
    // })
    // )


    
    currentEntries.sort((a, b):any => {
        if (a.completed && b.completed) return 0
        if (!a.completed && !b.completed) return 0
        if (a.completed && !b.completed) return 1
        if (!a.completed && b.completed) return -1
    })
    return {
        currentEntries,
        handleToggleSet
    }
}
