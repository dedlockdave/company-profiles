import React, { useContext, useState } from "react"
import moment from "moment"

type Commitments = {
    date: moment.Moment
}

type CommitmentsCtx = {
    Commitments: Commitments
    setCommitments: any
}

export const CommitmentsContext = React.createContext<
    CommitmentsCtx | undefined
>(undefined)

export function CommitmentsProvider({ children }: any) {
    let [Commitments, setCommitments] = useState({
        date: moment().startOf('day')
    })

    return (
        <CommitmentsContext.Provider value={{ Commitments, setCommitments }}>
            {children}
        </CommitmentsContext.Provider>
    )
}

export function GetDateScope(){
    let ctx = useContext(CommitmentsContext)
    if (!ctx) return null
    
    let {Commitments : {date}} = ctx
    return date
}