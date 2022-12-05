import { useRouter } from "next/router"
import { useEffect } from "react"
import MainArea4 from "../components/layoutV4/MainArea4"
import { useHomePage } from "../usecases/useHomePage"
import { MarkCompletion } from "../components/habits/TrackHabits"

export default function Home() {
    let router = useRouter()
    let { goToEdit } = useHomePage()
    useEffect(() => {
        if (goToEdit) {
            router.replace("/edit")
        }
    }, [goToEdit, router])

    return (
        <MainArea4>
            <MarkCompletion />
        </MainArea4>
    )
}

