import moment from "moment"

export function isRelevant(date: moment.Moment, daysCommitted: number[]) {
    let dayOfWeek = date.day()
    if (daysCommitted.length != 7) {
        throw Error("invalid arg daysCommitted")
    }

    return daysCommitted[dayOfWeek] == 1
}
