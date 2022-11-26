import Tags from "./Tags"
import Nav from "./nav/Nav"
import { Footer } from "./Footer"
import { useScreenSize } from "../../utils/effects"

export default function LayoutV4({ children }) {
    let screen = useScreenSize()
    let styles

    if (screen == "small" || screen == "super-small") {
        styles = {
            // display: "grid",
            // gridTemplateRows: "6vh auto",
            alignItems: "center",
        }
    } else {
        styles = {
            display: "grid",
            gridTemplateRows: "6vh auto",
            gridTemplateCols: "100vw",
            alignItems: "center",
        }
    }

    return (
        <div className="" style={styles}>
            <Nav />
            {children}
            <Footer />
            <Tags />
        </div>
    )
}
