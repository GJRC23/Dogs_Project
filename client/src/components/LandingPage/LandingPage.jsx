import './LandingPage.css'
import { Link } from "react-router-dom";

const LandingPage = () => {
    return(
        <div className="landing-page">
            <h1>Find your favorite friend</h1>
            <Link to="/home">Get started</Link>
        </div>
    )
}

export default LandingPage;