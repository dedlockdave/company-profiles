import Image from 'next/image'
import { useState } from 'react'
import ProfilePic from './ProfilePic'
import PopoverAnimated from '../popover/Popover'
import { callbackURLSignOut } from '../../utils/consts'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '../../utils/supabase'

export default function ProfilePicSettings({ profileImage }) {
    let [isOpen, setIsOpen] = useState()

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div onClick={() => setIsOpen(true)} className='flex flex-row justify-center cursor-pointer'>
                <ProfilePic userImage={profileImage} />
            </div>

            <ProfileTooltip key="profileTooltip" isOpen={isOpen} handleClose={handleClose} />
        </>
    )
}

function ProfileTooltip({ isOpen, handleClose }) {
    const logout = () => supabase.auth.signOut()
    return (
        <div key="profileTooltiopos">
            <PopoverAnimated position={'top-10 right-16'} isOpen={isOpen} handleClose={handleClose}>
                <div className="relative z-[200] bg-primary-black cursor-pointer text-center flex flex-row space-x-5 rounded-[15px] h-fit p-2 border border-white/[0.3]">
                    <div className='bg-[#DC6045]/[0.85] rounded-[15px] flex p-2' onClick={logout}>
                        <div className='relative h-[28px] w-[28px] flex'>
                            <Image width={32} height={32} src={"/images/logout.svg"} alt="logout" />
                        </div>
                    </div>
                </div>
            </PopoverAnimated>
        </div>
    )

    // if (typeof window == "undefined") {
    //     return null
    // }

    // const target = document && document.body
    // return createPortal(m, target)
}