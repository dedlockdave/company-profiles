import moment from 'moment';
import { supabase } from '../utils/supabase';
import { Activity, fetchUserActivities } from './Activity';
import {v4 as uuidv4} from 'uuid';
import { UserActivitiesEntries } from '../usecases/useData';


export class ActivityEntry {
    public id: string = uuidv4()
    public user_id: string = ""
    public user_activities_id: string = ""
    public entry_date: moment.Moment = moment().startOf('day')
    public completed: boolean = false
    
    public activityName: string = ""
    public activity_type: string = ""

    public constructor(init?: Partial<ActivityEntry>) {
        Object.assign(this, init);
    }
}

// export class SuccessReport {
//     public data: ActivityReport[] = []
//     public ratios: number[] = []
// }

export class ActivityReport {
    public activity: Activity = new Activity()
    public data : EntryDataPoint[] = []
    public ratio: number = 0

    public constructor(init?: Partial<ActivityReport>) {
        Object.assign(this, init);
    }
}

type EntryDataPoint = {
    entry_date: moment.Moment,
    completed: boolean
}

export function createEntry(activity: Activity, completed:boolean, entry_date: moment.Moment) : ActivityEntry {
    return new ActivityEntry({
        id: uuidv4(),
        user_id: activity.user_id,
        user_activities_id: activity.id,
        entry_date,
        completed
    })
}

export async function fetchActivityEntriesByDate(userID : string ,created_time: moment.Moment) {
    const { data, error } = await supabase
    .from('activities_entries')
    .select()
    .eq('user_id', userID)
    .eq('entry_date', created_time.toISOString())

    if (error) throw Error(`could not get data ${error.message}`)
    return data as ActivityEntry[]
    
}

export async function fetchAllActivityEntries(userID : string ) {
    const { data, error } = await supabase
    .from('activities_entries')
    .select()
    .order('entry_date', { ascending: false })
    .eq('user_id', userID)

    if (error) throw Error(`could not get data ${error.message}`)
    return data as ActivityEntry[]
    
}

export async function insertUserActivityEntries(entries : ActivityEntry[]) {
    // apppend uuids for new activites to be upserted
    const { data, error } = await supabase
        .from('activities_entries')
        .upsert(entries.map((e:ActivityEntry) => {
            return {
                id: e.id,
                user_id: e.user_id,
                user_activities_id: e.user_activities_id,
                completed: e.completed,
                entry_date: e.entry_date
            }
        }), {onConflict: "user_id,user_activities_id,entry_date"} )

    if (error) throw Error(`could not insertUserActivityEntries ${error.message}`)
}

export async function getSuccessReport(userID : string, activities: Activity[]) {
    let activityEntries = await fetchAllActivityEntries(userID)
    if (!activities?.length || !activityEntries?.length) return
    
    let entryMap : {[user_activities_id: string]: ActivityEntry[]} = {}
    for (let i=0; i<activityEntries.length; i++) {
        let ae = activityEntries[i]
        if(entryMap[ae.user_activities_id]) {
            entryMap[ae.user_activities_id].unshift(ae)
        } else {
            entryMap[ae.user_activities_id] = [ae]
        }
    }

    let report : ActivityReport[] = []
    
    activities.forEach(activity => {
        let entries = entryMap[activity.id]
        if (!entries) { // nothing here right
            return null
        }
        let data = entries.map(e => ({entry_date: e.entry_date,completed: e.completed}))
        let ratio = calcSuccessRatio(data)

        let as = new ActivityReport({
            activity,
            data,
            ratio
        })
        
        report.push(as)
    })

    return report
}

function calcSuccessRatio(entries : EntryDataPoint[]) : number{
    let successes = entries.filter((e : EntryDataPoint) => e.completed)
    
    return successes.length / entries.length

}
