// import { useDragControls } from "framer-motion";
// import { useContext } from "react";
// import { LayoutContext, SetLoginModal } from "../contexts/LayoutContext";

import moment from "moment";
import { useCallback, useEffect, useState } from "react";
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
        // go through all activities,
        // check if this is even a relevant day to mark completion
        // add or edit activity entries for this
        activities?.forEach(activity => {
            if (!activity.days ) {
                console.error("no days found on activity", activity)
            } else if (!activity.days[currentDate!.day()]) {
                // not relevant for this
            } else {
                let entry = activitiesEntries?.find(ae => ae.user_activities_id == activity.id)
                if (entry) {
                    entry.activtyName = activity.name
                    entry.activity_type = activity.activity_type
                    out.push(entry!)
                } else {
                    let defaultCompletion
                    if (activity.activity_type == "habit") {
                        defaultCompletion = false
                    } else if (activity.activity_type == "abstain") {
                        defaultCompletion = true
                    }

                    out.push(new ActivityEntry({
                        user_id: user.userID,
                        user_activities_id: activity.id,
                        activtyName: activity.name,
                        entry_date: currentDate!,
                        activity_type: activity.activity_type,
                        completed: defaultCompletion
                    }))
                }
            }

        })

        setCurrentEntries(out)
    }, [activities, activitiesEntries, currentDate, user.userID])

    const handleToggleSet = (uid : string, completion : boolean) => {
        try {
            if (!currentEntries) return null
            let update = [...currentEntries] as ActivityEntry[]
            let item = update.find(u => u.user_activities_id == uid)
            item!.completed = completion
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
        habits: currentEntries.filter(a => a.activity_type == "habit"),
        abstains: currentEntries.filter(a => a.activity_type == "abstain"),
        handleToggleSet
    }
}

