import { Activity } from "./Activity"

export class User {
    public userID: string = ""
    public activities: Activity[] = []

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}
