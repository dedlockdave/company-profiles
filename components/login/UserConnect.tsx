import React, { useEffect } from 'react'
// import { useSession } from 'next-auth/react'
// import { LayoutContext } from '../../contexts/LayoutContext'
import LoginModal from './LoginModal'
import ProfilePicSettings from '../profileV2/ProfilePicSettings'
import Button from '../general/Btn'
import { useUserConnect } from '../../usecases/useUser'
import { useLoginModal } from '../../usecases/useLayout'

const Login = () => {
	// const session = useSession()
	// console.log("session",session)
	// console.log("supabase",supabase)
	// useEffect(

    //     function fetchUser() {
    //         async function getUser(){
    //             const { data: { user } } = await supabase.auth.getUser()
    //             console.log(user)
    //         }
            
    //         getUser()
    //     }
    // )
	let {
		isLoggedIn,
		userName
	} = useUserConnect()

	let {
		openLoginModal
	} = useLoginModal()
	
	if (isLoggedIn) return (
		<div className='space-y-2'>
			<div className='flex flex-row items-center space-x-1 justify-center cursor-pointer'>
				<span className='text-demph text-xs'>{userName}</span>
				<ProfilePicSettings profileImage={"/images/seed.svg"} />
			</div>
		</div>
	)

	return (
		<>
			<Button 
				className='text-white'
				variant="contained"
				onClick={openLoginModal}>
					Login
			</Button>
			<LoginModal />
		</>

	)
}


export default Login