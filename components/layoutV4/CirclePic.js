import Image from "next/image"
import { useScreenSize } from "../../utils/effects"
import {validImageURL} from "../../components/profileV2/util"

export default function CirclePic({ size, imageURL }) {
    let screenSize = useScreenSize()
    // unit sm is px
    // tailwail warning don't use dynamic value in className
    let image = validImageURL(imageURL) ? imageURL : '/images/plum.png'
    return (
        <div className={`relative align-self-center rounded-full overflow-hidden`} style={{ height: (screenSize != "large") ? `${size / 2}px` : `${size}px`, width: (screenSize != "large") ? `${size / 2}px` : `${size}px` }}>
            <Image src={image}
                alt={imageURL} layout="fill" objectFit="cover" />
        </div>
    )
}