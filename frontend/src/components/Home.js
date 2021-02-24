//import Login2 from './Login2';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../styles/Home.css';
import logo from '../assets/icon-left-font-monochrome-white.png'
import img1 from '../assets/pexels-fauxels-3183197.jpg'
import img2 from '../assets/pexels-fauxels-3184653.jpg'



function Home() {
    return ( 
      <div className="row bg-homepage">
        <div className="col d-flex flex-column align-items-center">
          <img className='logo-home' src={logo} height='400' alt='Groupomania'/>
          <h2 className='title text-white pb-5'>Connecting people</h2>
          <div className="text-presentation text-center text-white">Bienvenue dans notre réseau social interne, moderne et ludique, entièrement dédié aux salariés de l'entreprise qui souhaitent créer du lien dans un cadre plus informel </div>
          <Link className="mt-5 mb-5" to="/login"><button className="bouton border-0">ENTREZ</button></Link>
        </div>
      <div className="col-6 p-0">
        <div id="carousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt=""/>
            </div>
            <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </div>
      );
  }

export default Home;
