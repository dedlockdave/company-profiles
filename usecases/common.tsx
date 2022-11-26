import moment from "moment"
import { useEffect, useState } from "react"
import { GetUser } from "../contexts/UserContext"
import { getUserCommitments } from "../entities/Activity"
import { Activity } from "../entities/Activity"
import { ActivityEntry, getActivityEntries } from "../entities/ActivityEntry"


export function UserActivities(userID : string){
    let [activities, setActivities] = useState<Activity[]>()

    useEffect(() => {
        async function fetchActivities() {
            let c =  await getUserCommitments(userID)
            console.log("fetched ",c)
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
            let c =  await getActivityEntries(userID, createdTime)
            console.log("fetched ",c)
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
