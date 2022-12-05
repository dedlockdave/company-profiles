import Image from 'next/image'
import { useState } from 'react'
import ProfilePic from './ProfilePic'
import PopoverAnimated from '../popover/Popover'
import { callbackURLSignOut } from '../../utils/consts'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '../../utils/supabase'

export default function ProfilePicSettings({ profileImage }) {
    
}

function ProfileTooltip({ isOpen, handleClose }) {
    
    return (
        
    )
}