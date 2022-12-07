import { describe, expect, test } from '@jest/globals';
import { fail } from 'assert';
import moment from 'moment';
import { Activity, upsertUserActivity, fetchUserActivities } from '../entities/Activity';
import { ActivityEntry, createEntry, getSuccessReport, insertUserActivityEntries } from '../entities/ActivityEntry';
import { isRelevant } from '../utils/date';
import {v4 as uuidv4} from 'uuid';
import { getQuote, getQuoteSeed, insertQuotes, Quote } from '../entities/Quote';

const uid = 'd2b790a3-dc85-4aa1-8a8c-4e425eeb1c1a'

test('integration', async () => {
  try {
    let as = [
      { user_id: uid, name: "habit1", days: [1, 1, 1, 1, 1, 1, 1], activity_type: "habit" },
      { user_id: uid, name: "abstain1", days: [1, 0, 0, 0, 1, 0, 0], activity_type: "abstain" }
    ] as Activity[]
    await upsertUserActivity(as)
  } catch (error) {
    // console.log("upsert failed most likely data already exists")
    
  }

  let activities = await fetchUserActivities(uid)
  
  let activityEntries : ActivityEntry[] = []
  
  for (let an=0;an<activities.length;an++) {
    let curr = moment().startOf('day')
    let activity = activities[an]
    
    for (let i = 0; i < 10; i++) {
      curr.subtract(1, "days")
      if (!isRelevant(curr, activity.days)) continue

      let completed = i != 5 ? true : false
      let ae = createEntry(activity, completed, curr.clone())
      activityEntries.push(ae)
    }
  }

  try {
    insertUserActivityEntries(activityEntries)
  } catch (error) {
    fail(error as string)    
  }
})

test('quotes', async () => {
  let data = await getQuoteSeed()
  let quotes = data.map((d: any) => new Quote({quote: d.q, author: d.a}))
  insertQuotes(quotes)
})


// test('getUserCommitments', async () => {
//     let testID = 
//     const data = await getUserCommitments(testID);
//     console.log(data)
//     expect(data.length).toBe(1);
//   });