// import { useDragControls } from "framer-motion";
// import { useContext } from "react";
// import { LayoutContext, SetLoginModal } from "../contexts/LayoutContext";

import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import { v4 } from "uuid"
import { GetDateScope } from "../contexts/CommitmentsContext"
import { GetUser } from "../contexts/UserContext"
import {
    ActivityEntry,
    ActivityReport,
    insertUserActivityEntries,
} from "../entities/ActivityEntry"
import { SuccessReports, UserActivities, UserActivitiesEntries } from "./useData"

export type ActivityCard = {
    entry: ActivityEntry
    report: ActivityReport
}

export function useMarkCompletion() {
    let [activityCards, setActivityCards] = useState<ActivityCard[]>(
        [] as ActivityCard[]
    )

    let currentDate = GetDateScope()
    let user = GetUser()

    let { activities } = UserActivities(user?.userID)
    let { activitiesEntries } = UserActivitiesEntries(
        user?.userID,
        currentDate!
    )

    let { reports } = SuccessReports(user?.userID, activities!)

    useEffect(() => {
        let out: ActivityCard[] = []

        // go through all activities,
        // check if this is even a relevant day to mark completion
        // add or edit activity entries for this
        activities?.forEach((activity) => {
            if (!activity.days) {
                console.error("no days found on activity", activity)
            } else if (!activity.days[currentDate!.day()]) {
                // not relevant for this
            } else {
                let entry = activitiesEntries?.find(
                    (ae) => ae.user_activities_id == activity.id
                )
                
                let report = reports?.find(
                    (as: ActivityReport) => as.activity.id == activity.id
                    ) || new ActivityReport()
                
                if (entry) {
                    entry.activityName = activity.name
                    entry.activity_type = activity.activity_type
                    out.push({ entry: entry, report: report! })
                } else {
                    let defaultCompletion
                    if (activity.activity_type == "habit") {
                        defaultCompletion = false
                    } else if (activity.activity_type == "abstain") {
                        defaultCompletion = true
                    }

                    out.push({
                        entry: new ActivityEntry({
                            user_id: user.userID,
                            user_activities_id: activity.id,
                            activityName: activity.name,
                            entry_date: currentDate!,
                            activity_type: activity.activity_type,
                            completed: defaultCompletion,
                        }),
                        report 
                    })
                }
            }
        })

        setActivityCards(out)
    }, [activities, activitiesEntries, reports, currentDate, user.userID])

    const handleToggleSet = (uid: string, completion: boolean) => {
        try {
            if (!activityCards || !uid) return null
            let update = [...activityCards] as ActivityCard[]
            let item = update.find((u) => u.entry.user_activities_id == uid)
            item!.entry.completed = completion
            insertUserActivityEntries(update.map(u => u.entry) as ActivityEntry[])
            setActivityCards(update)
        } catch (error) {
            // set notificaiton if we fuck p
        }
    }

    activityCards.sort((a, b): any => {
        if (a.entry.completed && b.entry.completed) return 0
        if (!a.entry.completed && !b.entry.completed) return 0
        if (a.entry.completed && !b.entry.completed) return 1
        if (!a.entry.completed && b.entry.completed) return -1
    })

    return {
        habits: activityCards.filter((a) => a.entry.activity_type == "habit"),
        abstains: activityCards.filter(
            (a) => a.entry.activity_type == "abstain"
        ),
        handleToggleSet,
    }
}
