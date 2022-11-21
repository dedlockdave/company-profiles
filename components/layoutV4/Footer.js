
export function Footer() {
    return (
        <div className='relative bottom-0 border-t border-div1 w-screen md:pr-16'>
            <div className="flex flex-row-reverse space-x-4">
              <p className="text-xs">footer</p>
                {/* <SocialCircle profileURL={"https://www.tiktok.com/@plumweb3?_t=8Vjfjvs0cVG&_r=1"} src={"/images/icon_tiktok.svg"} />
                <SocialCircle profileURL={"https://twitter.com/plum_gang"} src={"/images/icon_twitter.svg"} />
                <SocialCircle profileURL={"https://discord.gg/mDNuG9WZNj"} src={"/images/icon_discord.svg"} /> */}
            </div>
        </div>
    )
}

// function SocialCircle({ src, profileURL }) {
//     return (
//       <a className='cursor-pointer mx-4' href={profileURL}>
//         <div className='flex'>
//           <div className="h-8 w-8 my-4 rounded-full bg-plum-royal-blue flex items-center justify-center" >
//               <Image src={src} height={20} width={20} />
//           </div>
//         </div>
//       </a>
//     )
//   }