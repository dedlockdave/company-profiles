import moment from "moment"
import { useRouter } from "next/router"
import { useEffect } from "react"
import MainArea4 from "../components/layoutV4/MainArea4"
import { useHomePage } from "../usecases/useHomePage"
import { MarkCompletion } from "../components/habits/TrackHabits"
import Link from "next/link"
import { Quote } from "../entities/Quote"

export default function Home() {
    let router = useRouter()
    let { goToEdit, quote } = useHomePage()
    useEffect(() => {
        if (goToEdit) {
            router.replace("/edit")
        }
    }, [goToEdit, router])


    return (
        <MainArea4>
            <div className="mb-4">
                <Link href="/edit">
                    <p className="m-0 font-bold text-right underline text-sm text-demph ">
                        Edit
                    </p>
                </Link>
                
                <h3 className="text-center m-0">
                    {moment().format("MMM Do YY")}
                </h3>

                <HeaderQuote quote={quote!} />

            </div>
            <MarkCompletion />
        </MainArea4>
    )
}

function HeaderQuote({quote}:any) {
    if(!quote) return null
    console.log(quote)
    return(
        <div className="text-center text-demph">
            <blockquote className="italic">
                {quote.quote}
                <br/>
                -{quote.author}
            </blockquote>
        </div>
    )
}