import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../utils/supabase';

export class Activity {
    public id: string = ""
    public user_id: string = ""
    public name: string = ""
    public activity_type: string = ""
    public days: number[] = [0, 0, 0, 0, 0, 0, 0]
    public created_time: moment.Moment = moment()

    public constructor(init?: Partial<Activity>) {
        Object.assign(this, init);
    }

    public isHabit() {
        return this.activity_type == "habit"
    }

    public isAbstain() {
        return this.activity_type == "abstain"
    }
}

export async function fetchUserActivities(userID: string) {
    const { data, error } = await supabase
        .from('user_activities')
        .select()
        .order('created_time', { ascending: false })
        .eq('user_id', userID)

    if (error) throw Error(`could not get data ${error.message}`)
    return data as Activity[]
}

export async function upsertUserActivity(a: Activity[]) {
    // apppend uuids for new activites to be upserted
    a.forEach(act => {
        if (act.id == "") act.id = uuidv4()
    })
    const { data, error } = await supabase
        .from('user_activities')
        .upsert(a)
    if (error) throw Error(`could not get data ${error.message}`)

}

export async function deleteUserActivity(id: string) {
    const { data, error } = await supabase
        .from('user_activities')
        .delete()
        .eq('id', id)

    if (error) throw Error(`could not delete ${error.message}`)
}
