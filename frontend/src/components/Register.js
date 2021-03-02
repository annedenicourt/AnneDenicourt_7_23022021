import '../styles/Login.css'
import Banner from './Banner';
import Footer from './Footer';
import SignupForm from './SignupForm';



function Login () {

    return (
        <div className="bg-login"> <Banner /> 
            <div className="row justify-content-center mb-5">
                <div className="col-10 col-md-8 col-lg-4 p-0">
                    <SignupForm />
                </div>
            </div>    
            <Footer />
        </div>
    )
}
  

export default Login
