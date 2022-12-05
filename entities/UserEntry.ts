import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import { supabase } from '../utils/supabase';

export class UserEntry {
    public id: string = ""
    public created_date: moment.Moment = moment().startOf('day')
    
    public user_id: string = ""
    
    public user_activities_id: string = ""
    
    public user_consumes_id: string = ""
       
    public activtyName: string = ""
    public completed: boolean = false

    public constructor(init?: Partial<UserEntry>) {
        Object.assign(this, init);
    }
}

type ActivityEnty = {
    completed: boolean 
}

export async function getActivityEntries(userID : string ,created_time: moment.Moment) {
    const { data, error } = await supabase
    .from('user_activities_entries')
    .select()
    .eq('user_id', userID)
    .eq('created_time', created_time.toISOString())

    if (error) throw Error(`could not get data ${error.message}`)
    return data as ActivityEntry[]
    
}

export async function insertUserActivityEntries(entries : ActivityEntry[]) {
    // apppend uuids for new activites to be upserted
    const { data, error } = await supabase
        .from('user_activities_entries')
        .upsert(entries.map((e:ActivityEntry) => {
            return {
                user_id: e.user_id,
                user_activities_id: e.user_activities_id,
                completed: e.completed,
                created_time: e.created_time
            }
        }))

    if (error) throw Error(`could not get data ${error.message}`)
}