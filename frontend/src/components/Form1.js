import '../styles/Form1.css'
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import { useRef } from 'react';

function Form1 () {

    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  console.log(watch("example")); 

  return (
    <form className='login-form-1' onSubmit={e => e.preventDefault()}>
        <h3 className='text-center text-white mb-4 border-bottom pt-5 pb-2'>S'INSCRIRE</h3>

        <label htmlFor="pseudo" className="form-label text-white">Nom/Pseudo</label>
        <input className="form-control mb-4" name="name" placeholder="Votre nom/pseudo *"ref={register({required: true, maxLength: 15})}/>
        {_.get("name.type", errors) === "required" && (<p>Le champ est obligatoire</p>)}
        {_.get("name.type", errors) === "maxLength" && (<p>Le nom ne peut pas faire plus de 15 caractères</p>)}

        <label htmlFor="email1" className="form-label text-white">Adresse mail</label>
        <input className="form-control mb-4" name="email" placeholder="Votre adresse mail *" ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
        {_.get("email.type", errors) === "pattern" && (<p>Adresse mail non valide</p>)}

        <label htmlFor="password1" className="form-label text-white">Mot de passe</label>
        <input className="form-control mb-4" name="password" placeholder="Votre mot de passe *" type="password" ref={register({ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/ })} />
        {errors.password && (<p>Mot de passe incorrect</p>)}

        <label htmlFor="confirm-password" className="form-label text-white">Confirmation mot de passe</label>
        <input className="form-control mb-4" name="confirm_password" placeholder="Confirmation mot de passe *" type="password"ref={register({validate: value =>value === password.current || "Le mot de passe n'est pas identique"})}/>
        {errors.confirm_password && <p>{errors.confirm_password.message}</p>}

        <div className='text-center'><button type="submit" className="btnSubmit mt-4" onClick={handleSubmit(onSubmit)}>Créer un profil</button></div>
    </form>
  );
}

export default Form1
