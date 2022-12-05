import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import { supabase } from '../utils/supabase';


export class ActivityEntry {
    public id: string = ""
    public user_id: string = ""
    public user_activities_id: string = ""
    public entry_date: moment.Moment = moment().startOf('day')
    public completed: boolean = false
    
    public activtyName: string = ""
    public activity_type: string = ""

    public constructor(init?: Partial<ActivityEntry>) {
        Object.assign(this, init);
    }

}

export async function getActivityEntries(userID : string ,created_time: moment.Moment) {
    const { data, error } = await supabase
    .from('activities_entries')
    .select()
    .eq('user_id', userID)
    .eq('entry_date', created_time.toISOString())

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

    if (error) throw Error(`could not get data ${error.message}`)
}