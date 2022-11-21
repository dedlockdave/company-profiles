import Tags from './Tags'
import { useScreenSize } from '../../utils/effects'
import { Footer } from './Footer'
// import { useRouter } from 'next/router'

export default function Index({children}) {
    let screen = useScreenSize() 
    // let router = useRouter()
    // let {user} = useSelector(s => s.user)
    
    // if (user && user.crmProjects && user.crmProjects.length) {
    //     router.push(`/dashboard/${user.crmProjects[0].projectID}`)

    // }
    
    let styles
    if (screen == "small" || screen == "super-small") {
        styles = {
            display: "grid",
            gridTemplateRows: "100vh auto",
            gridTemplateColumns: "100vw",
            alignItems: "center",

        }
    } else {
        styles = {
            display: "grid",
            gridTemplateRows: "100vh auto",
            gridTemplateColumns: "100vw",
            alignItems: "center",
        }
    }

    return (
        <div style={styles}>
            {children}
            <div className='mt-8'>
                <Footer/>
            </div>
            <Tags />
        </div>
  )
}
 