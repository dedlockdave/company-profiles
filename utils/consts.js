
export const defaultImage = "/images/logo.png"

export const sideNavGradient = 'linear-gradient(to bottom, rgba(109,30,129,1) 0%,rgba(29,30,37,0.88) 100%)'

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
