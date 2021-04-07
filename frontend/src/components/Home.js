import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import LoginForm from './LoginForm';
import logo from '../assets/icon-left-font-monochrome-white.png'
import img1 from '../assets/pexels-fauxels-3183197.jpg'
import img2 from '../assets/pexels-fauxels-3184653.jpg'
import img3 from '../assets/pexels-fauxels-3184418.jpg'
import img4 from '../assets/pexels-picjumbocom-461077.jpg'
import LoginGoogle from './LoginGoogle';

function Home() {
    return ( 
        <div className="row bg-homepage">
            <div className="col col-md-12 col-lg-6 d-flex flex-column align-items-center">
                <img className='logo-home' src={logo} alt='Groupomania'/>
                <h2 className='title text-white pb-5'>Connecting people</h2>
                <LoginGoogle />
                <div className="col-8 mt-5 text-center">
                    <LoginForm />
                    <h4 className="title_register text-white mb-4">Pas encore inscrit ?</h4>
                    <Link className="mb-5 mt-3" to="/register"><button className="bouton border-0">INSCRIVEZ-VOUS</button></Link>
                </div>
            </div>
            <div className="col-6 p-0">
                <div id="carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="4000">
                            <img src={img1} className="d-block h-100 w-100" alt=""/>
                        </div>
                        <div className="carousel-item" data-bs-interval="4000">
                            <img src={img2} className="d-block h-100 w-100" alt=""/>
                        </div>
                        <div className="carousel-item" data-bs-interval="4000">
                            <img src={img3} className="d-block h-100 w-100" alt=""/>
                        </div>
                        <div className="carousel-item" data-bs-interval="4000">
                            <img src={img4} className="d-block h-100 w-100" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Home;