import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import { supabase } from '../utils/supabase';

export class Activity {
    public id: string = ""
    public user_id: string  = ""
    public name: string  = ""
    public days: number[]  = [0, 0, 0, 0, 0, 0, 0]
    public created_at: moment.Moment = moment()

    public constructor(init?:Partial<Activity>) {
        Object.assign(this, init);
    }
}

export async function getUserCommitments(userID: string){
    const { data, error } = await supabase
        .from('user_activities')
        .select()
        .order('created_at',  {ascending: false} )
        .eq('user_id', userID)    
    
    if (error) throw Error(`could not get data ${error.message}`)
    return data as Activity[]
}

export async function upsertUserActivity(a: Activity[]) {
    // apppend uuids for new activites to be upserted
    a.forEach(act => {
        if (act.id == "") act.id = uuidv4()
    })
    return await supabase
        .from('user_activities')
        .upsert(a)
}

export async function deleteUserActivity(id: string) {
    const { data, error } = await supabase
        .from('user_activities')
        .delete()
        .eq('id', id)
    
        if (error) throw Error(`could not delete ${error.message}`)
}
