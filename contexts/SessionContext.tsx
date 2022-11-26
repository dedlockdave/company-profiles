import { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../utils/supabase"

const init = {
    commitments: false,
    user: {}
}

export const SessionContext = createContext<Session|undefined>(undefined)

export function SessionProvider({children}:any) {
    let [session, setSession] = useState<Session|undefined>()
    useEffect(() => {
        (async function(){
            let {data: {session}} = await supabase.auth.getSession()
            setSession(session!);
            supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session!);
        });
        })()
      }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}

export function GetSession() {
    let session = useContext(SessionContext)
    return session
}