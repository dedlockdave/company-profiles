import moment from "moment"
import { useEffect, useState } from "react"
import { Activity, fetchUserActivities } from "../entities/Activity"
import { ActivityEntry, ActivityReport, fetchActivityEntriesByDate, getSuccessReport } from "../entities/ActivityEntry"


export function UserActivities(userID : string){
    let [activities, setActivities] = useState<Activity[]>()

    useEffect(() => {
        async function fetchActivities() {
            let c =  await fetchUserActivities(userID)
            setActivities(c)
        }
        if (userID) {
            fetchActivities()
        }
    }, [userID])

    return {
        activities,
        setActivities
    }
}

export function UserActivitiesEntries(userID : string, createdTime : moment.Moment){
    let [activitiesEntries, setActivitiesEntries] = useState<ActivityEntry[]>()

    useEffect(() => {
        async function fetchActivities() {
            let c =  await fetchActivityEntriesByDate(userID, createdTime)
            setActivitiesEntries(c)
        }
        if (userID && createdTime) {
            fetchActivities()
        }
    }, [userID, createdTime])

    return {
        activitiesEntries,
        setActivitiesEntries
    }
}


export function SuccessReports(userID : string ,activities: Activity[]) {
    let [reports, setReports] = useState<ActivityReport[]>()

    useEffect(() => {
        async function fetchAndSet() { 
            if (!userID || !activities?.length) return
            setReports(
                await getSuccessReport(userID, activities))
        }

        fetchAndSet()
    }, [activities, userID])

    return {
        reports
    }

    // useEffect(() => {
    //     async function fetchActivities() {
    //         let c =  await fetchActivityEntriesByDate(userID, createdTime)
    //         setActivitiesEntries(c)
    //     }
    //     if (userID && createdTime) {
    //         fetchActivities()
    //     }
    // }, [userID, createdTime])

}
