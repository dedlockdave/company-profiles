
export function logd(message) {
  if (process.env.NEXT_PUBLIC_PLUMENV == "dev") {
    console.log(`👉 ${message}`)
  }
}

export function errorA(message) {
  if (process.env.NEXT_PUBLIC_PLUMENV == "dev") {
    console.error(`❌ ${message}`)
  }
}