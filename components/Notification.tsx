import { useContext, useEffect } from "react"

import { ToastContainer, toast } from 'react-toastify'
import {NotificationContext} from '../contexts/NotificationContext'

export default function Notification(_props: any) {
  let toastMsg = useContext(NotificationContext)
  
  
  useEffect(() => {
    if (!toastMsg || !toastMsg.message) {
      return
    }
    switch (toastMsg.type) {
      case "success":
        toast.success(toastMsg.message)
        break
      case "error":
        toast.error(toastMsg.message)
        break
    
      default:
        toast(toastMsg.message)
        break
    }

  },[toastMsg])

  return (
    <>
      <ToastContainer autoClose={2856} theme="dark" />
    </>
  )
}