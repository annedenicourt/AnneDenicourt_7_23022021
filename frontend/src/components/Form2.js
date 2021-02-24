import '../styles/Form2.css'
import { useForm } from "react-hook-form";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png'

function Form2 () {

    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  console.log(watch("example")); 

  return (
    <form className='login-form-2' onSubmit={e => e.preventDefault()}>
        <h3 className='text-center text-white mb-4 border-bottom pt-5 pb-2'>SE CONNECTER</h3>

        <label htmlFor="email1" className="form-label">Adresse mail</label>
        <input className="form-control mb-4" name="email" placeholder="Votre adresse mail *" ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />

        <label htmlFor="password1" className="form-label">Mot de passe</label>
        <input className="form-control mb-4" name="password" placeholder="Votre mot de passe *" type="password" ref={register({ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/ })} />

        <div className='text-center'><Link className="text-dark" to="/forum"><button type="submit" className="btnSubmit2 mt-4">Se connecter</button></Link></div>
        <div className='text-center text-white mt-5 mb-4'>* Champs obligatoires</div>
        <h2 className='text-white text-center'>Connecting people</h2>
        <div className="login-logo text-center mt-4"><img src={logo} alt="logo Groupomania"/></div>
    </form>
  );
}
  

export default Form2
