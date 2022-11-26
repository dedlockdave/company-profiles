import {describe, expect, test} from '@jest/globals';
import { getUserCommitments } from '../entities/Activity';

test('getUserCommitments', async () => {
    let testID = 'd2b790a3-dc85-4aa1-8a8c-4e425eeb1c1a'
    const data = await getUserCommitments(testID);
    console.log(data)
    expect(data.length).toBe(1);
  });