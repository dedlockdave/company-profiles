import React from 'react'
import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { LayoutContext } from '../../contexts/LayoutContext'
import LoginModal from './LoginModal'
import ProfilePicSettings from '../profileV2/ProfilePicSettings'
import Button from '../button/Btn'




const Login = () => {
	
	let [layout, setLayoutContext] = useContext(LayoutContext)
	
	const { data: session } = useSession()
	if (session && session.user) return (
		<div className='space-y-2'>
			<div className='flex flex-row items-center space-x-1 justify-center cursor-pointer'>
				<span className='text-xs'>{session.user.name}</span>
				<ProfilePicSettings profileImage={session.user.image} />
			</div>
		</div>
	)

	return (
		<>
			<Button 
				className='text-white'
				variant="contained"
				onClick={() => setLayoutContext({...layout, isLoginModalOpen: true})}>
					Login
			</Button>
			<LoginModal />
		</>

	)
}


export default Login