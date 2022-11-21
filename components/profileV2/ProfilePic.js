import Image from "next/image"
import { validImageURL } from "./util"

export default function ProfilePic({userImage, handleClick}) {
    return (
        <div onClick={handleClick} className={`relative w-12 h-12 align-self-center border-4 rounded-full overflow-hidden`}>
            <Image src={validImageURL(userImage) ? userImage : "/images/defaults_profile_1.png"} layout="fill" objectFit="cover" />
        </div>
    )
}