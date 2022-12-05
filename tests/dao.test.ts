import {describe, expect, test} from '@jest/globals';
import { fail } from 'assert';
import { Activity, getUserCommitments, upsertUserActivity } from '../entities/Activity';

const uid = 'd2b790a3-dc85-4aa1-8a8c-4e425eeb1c1a'

test('integration', async () => {
  console.log("yessir")
  try {
    let as = [
      {user_id: uid, name: "activity1", days: [1, 1, 1, 1, 1, 1, 1]},
      {user_id: uid, name: "mf thing ", days: [1, 0, 0, 0, 1, 0, 0]}
     ] as Activity[]
     await upsertUserActivity(as)

     let ae = [
      {}
     ]
  } catch (error) {    
    fail(error as string)
  }
})


// test('getUserCommitments', async () => {
//     let testID = 
//     const data = await getUserCommitments(testID);
//     console.log(data)
//     expect(data.length).toBe(1);
//   });