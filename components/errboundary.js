import React from "react"
import MainArea4 from "./layoutV4/MainArea4"
import { withRouter } from "next/router"

export default withRouter(
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)

      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      console.log(error)
      // Update state so the next render will show the fallback UI

      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      // exceptionEvent(`## ${error} ## \n ${errorInfo}`)
      console.error({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <MainArea4>
            <div className="flex flex-col justify-center">
              <div className="text-center text-3xl">
                <h2>Oops, we goofed!</h2>
                <h2>Please let us know on Discord uWu</h2>
              </div>
            </div>
          </MainArea4>
        )
      }

      // Return children components in case of no error

      return this.props.children
    }
  }
)
