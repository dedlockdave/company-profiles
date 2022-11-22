
export const defaultImage = "/images/logo.png"

export const sideNavGradient = 'linear-gradient(0deg, rgba(36,193,150,.64) 0%, rgba(53,164,141,1) 7%, rgba(68,138,133,1) 23%, rgba(80,117,127,1) 33%, rgba(93,96,121,.94) 50%)'


export const seperator = 'border border-div-grey'

export function callbackURLSignIn() {
    if (process.env.NEXT_PUBLIC_PLUMENV == "prod") {
        return `https://crm.plum.club/connect`
     } else if (process.env.NEXT_PUBLIC_PLUMENV == "staging") {
         return `https://crm-staging.plum.club/connect`
     } else {
         return`http://localhost:3000/connect`
     }
}
// http://localhost:3000/projects/callback/discord
export function callbackURLSignOut() {
    if (process.env.NEXT_PUBLIC_PLUMENV == "prod") {
        return `https://crm.plum.club`
     } else if (process.env.NEXT_PUBLIC_PLUMENV == "staging") {
         return `https://crm-staging.plum.club`
     } else {
         return`http://localhost:3000`
     }
}
