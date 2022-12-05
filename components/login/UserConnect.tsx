import React, { useEffect, useState } from "react"
// import { useSession } from 'next-auth/react'
// import { LayoutContext } from '../../contexts/LayoutContext'
import LoginModal from "./LoginModal"
import Button from "../general/Btn"
import { useUserConnect } from "../../usecases/useUser"
import { useLoginModal } from "../../usecases/useLayout"
import PopoverAnimated from "../popover/Popover"
import ProfilePic from "../profileV2/ProfilePic"

import Image from "next/image"


const Login = () => {
    
    let { 
		isLoggedIn, 
		userName,
		handleLogout,
		profileImage,
	} = useUserConnect()

    let { 
		openLoginModal ,
		isPopoverOpen,
		closePopover,
		openPopover
	} = useLoginModal()


    if (isLoggedIn)
        return (
            <div className="space-y-2">
                <div className="flex flex-row items-center space-x-1 justify-center cursor-pointer">
                    <span className="text-demph text-xs">{userName}</span>
                    <>
                        <div
                            onClick={openPopover}
                            className="flex flex-row justify-center cursor-pointer"
                        >
                            <ProfilePic handleClick={()=>{}} userImage={profileImage} />
                        </div>

                        <div key="profileTooltiopos">
                            <PopoverAnimated
                                position={"top-10 right-16"}
                                isOpen={isPopoverOpen}
                                handleClose={closePopover}
                            >
                                <div className="relative z-[200] bg-primary-black cursor-pointer text-center flex flex-row space-x-5 rounded-[15px] h-fit p-2 border border-white/[0.3]">
                                    <div
                                        className="bg-[#DC6045]/[0.85] rounded-[15px] flex p-2"
                                        onClick={handleLogout}
                                    >
                                        <div className="relative h-[28px] w-[28px] flex">
                                            <Image
                                                width={32}
                                                height={32}
                                                src={"/images/logout.svg"}
                                                alt="logout"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </PopoverAnimated>
                        </div>
                    </>
                </div>
            </div>
        )

    return (
        <>
            <Button
                className="text-white"
                variant="contained"
                onClick={openLoginModal}
            >
                Login
            </Button>
            <LoginModal />
        </>
    )
}

export default Login
