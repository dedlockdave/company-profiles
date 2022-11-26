import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import { supabase } from '../utils/supabase';

export class ActivityEntry {
    public user_id: string = ""
    public user_activities_id: string = ""
    public activtyName: string = ""
    public completed: boolean = false
    public created_at: moment.Moment = moment().startOf('day')

    public constructor(init?: Partial<ActivityEntry>) {
        Object.assign(this, init);
    }

}

export async function getActivityEntries(userID : string ,created_at: moment.Moment) {
    const { data, error } = await supabase
    .from('user_activities_entries')
    .select()
    .eq('user_id', userID)
    .eq('created_at', created_at.toISOString())

    if (error) throw Error(`could not get data ${error.message}`)
    return data as ActivityEntry[]
    
}

export async function insertUserActivityEntries(entries : ActivityEntry[]) {
    // apppend uuids for new activites to be upserted
    console.log("gonna insert", entries)
    const { data, error } = await supabase
        .from('user_activities_entries')
        .upsert(entries.map((e:ActivityEntry) => {
            return {
                user_id: e.user_id,
                user_activities_id: e.user_activities_id,
                completed: e.completed,
                created_at: e.created_at
            }
        }))

    if (error) throw Error(`could not get data ${error.message}`)
}