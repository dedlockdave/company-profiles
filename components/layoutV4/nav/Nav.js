import Image from "next/image"
import { useContext } from "react"

import { useRouter } from "next/router"
import Link from "next/link"

import Login from "../../login/UserConnect"
import { useScreenSize } from "../../../utils/effects"
import NavMobile from "./MobileNav"
import { LayoutContext } from "../../../contexts/LayoutContext"

export default function Nav() {
    let screen = useScreenSize() 
    let [{isMobileNavOpen}, setLayoutContext] = useContext(LayoutContext)
    if (screen == "small" || screen == "super-small") {
        return (
            <div className='flex justify-between items-center m-3'>
                <NavMobile>
                    <div className='flex flex-col h-full mt-16 px-8'>
                        <Link href="/"> 
                            <div className='flex items-center space-x-3 cursor-pointer'>
                                <HomeBrandIcon />
                            </div>
                        </Link>

                        <div className="my-12 flex flex-col  items-end text-lg space-y-6 cursor-pointer">
                            <Routes />
                        </div>

                    </div>
                </NavMobile>
            <div className="flex justify-end space-x-3">
                {/* <Image src={'/images/icon_search.svg'} height={21} width={21} /> */}
                <div onClick={() => isMobileNavOpen && setLayoutContext({isMobileNavOpen: false})}>
                    <Login />
                </div>
            </div>
            </div>
        )
    } else {
        return (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center border-b border-div-grey">
                <Link href="/"> 
                    <div className='pl-12 flex items-center space-x-3 cursor-pointer'>
                        <HomeBrandIcon />
                    </div>
                </Link>

                <div className="flex justify-center text-sm md:text-base space-x-9 cursor-pointer">
                    <Routes />
                </div>

                <div className="pr-12 flex justify-end space-x-3">
                    {/* <Image src={'/images/icon_search.svg'} height={21} width={21} /> */}
                    <Login />
                </div>
            </div>
        )
    }
}


export function HomeBrandIcon() {
    let ss =  useScreenSize()
    let h=54; let w=45
    if (ss == "super-small") {
        h=50;w=34
    }

    let app = "Demo"

    // let {pathname} = useRouter()
    // switch (pathname.split("/")[1]) {
    //     case "playlists":
    //         app = "Lists"
    //         break
    //     case "track":
    //         app = "Track"
    //         break
    //     default:
    //         app = "Web3"
    // }

    return (
        <>
            <Image alt="" src={'/images/logo.svg'} height={h} width={w} />
            <span className="text-sm font-bold text-accent1 ml-2">{app}</span>
        </>
    )
}

const getClass = (currentPath, href) => currentPath !="" && href.includes(currentPath) ? "font-extrabold text-sm rounded-3xl py-2 px-6 bg-plum-purple text-sm " : "text-sm flex flex-col justify-center hover:opacity-60"
function NavItem({url, name, match}) {
    let {pathname} = useRouter()
    let basePath = pathname.split("/")[1]
    return (<Link href={url}><span className={getClass(basePath, match)}>{name}</span></Link>)
}

function Routes(){
    return (
        <>
            {/* <NavItem url="/about" name="About" match="about" /> */}
            <NavItem url="/" name="Home" match="home" />
        </>
    )
}