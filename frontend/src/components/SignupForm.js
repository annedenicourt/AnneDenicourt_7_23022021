import '../styles/SignupForm.css'
import { Component } from 'react';
//import UserDataService from "../services/user.service";
import { Link } from 'react-router-dom';
import axios from "axios";


class SignupForm extends Component {

  state = {
      fields: {
          email: '',
          name: '',
          password: '',
          confirm_password:''
      },
      errors: {}
  }

  handleValidation() {
    let { fields } = this.state;
    let formIsValid = true
    let errors = {};

    // validation name
    if (!fields['name']) {
        errors['name'] = 'Ce champ ne peut pas être vide';
    } else if (fields['name'].length < 3) {
        errors['name'] = 'Le nom d\'utilisateur doit contenir au minimum 3 caractères';
    } else if (fields['name'].length > 20) {
        errors['name'] = 'Le nom d\'utilisateur doit contenir au maximum 20 caractères';
    }
      
    // validation email 
    if (!fields['email']) {
        errors['email'] = 'Ce champ ne peut pas être vide';
    } else if (!fields['email'].match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
        errors['email'] = 'L\'email n\'est pas valide';
    }

    // validation confirm_password
    if (!fields['confirm_password']) {
        errors['confirm_password'] = 'Ce champ ne peut pas être vide';
    } else if (fields['confirm_password']!== fields['password']) {
        errors['confirm_password'] = 'Le mot de passe n\'est pas identique';
    }
    // validation password 
    if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(fields['password'])) {
        errors['password'] = '8 caractères min. dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial';
    }

    if (Object.keys(errors).length !== 0) {
        formIsValid = false;
    }
    
    this.setState({ errors });

    return formIsValid;
  }

  handleFormSubmit = (event,data) => {
    event.preventDefault();
    if (this.handleValidation()) {
        let { fields } = this.state;
        axios.post('http://localhost:3000/api/auth/signup', {
                email: fields['email'],
                name: fields['name'],
                password: fields['password']
        }) 
        //UserDataService.createUser()
        .then(res => {
            window.location.href = "/forum";
        })
        .catch(
        error=>console.log(error))
    }
  }

  handleChange = (event) => {
      let { fields } = this.state;
      fields[event.target.name] = event.target.value.trim();
      this.setState({
          fields
      })
  }

  render() {
      let { errors } = this.state;

      return (
          <form className='login-form-1 rounded' action="" method="post" noValidate onSubmit={this.handleFormSubmit}>
            <h3 className='text-center text-white mb-4 border-bottom pt-5 pb-2'>S'INSCRIRE</h3>

                <label htmlFor="name" className="form-label text-white">Nom/Pseudo *</label>
                <input type="text" name="name" id="name" className="form-control mb-4" placeholder="Votre nom d'utilisateur" value={this.state.fields['name']} onChange={this.handleChange}/>
                {errors['name'] ? (
                  <p className="err_message">{errors['name']}</p>
                ) : '' }

                <label htmlFor="email" className="form-label text-white">Adresse mail *</label>
                <input type="email" name="email" id="email" className="form-control mb-4" placeholder="Votre adresse mail" value={this.state.fields['email']} onChange={this.handleChange}/>
                {errors['email'] ? (
                  <p className="err_message">{errors['email']}</p>
                ) : '' }

                <label htmlFor="password" className="form-label text-white">Mot de passe *</label>
                <input type="password" name="password" id="password" className="form-control mb-4" placeholder="Votre mot de passe" value={this.state.fields['password']} onChange={this.handleChange}/>
                {errors['password'] ? (
                  <p className="err_message">{errors['password']}</p>
                ) : '' }

                <label htmlFor="confirm-password" className="form-label text-white">Confirmation mot de passe *</label>
                <input type="password" className="form-control mb-4" name="confirm_password" id="confirm_password" placeholder="Confirmation mot de passe" value={this.state.fields['confirm_password']} onChange={this.handleChange}/>
                {errors['confirm_password'] ? (
                <p className="err_message">{errors['confirm_password']}</p>
                ) : '' }

                <div className='text-center mt-4 mb-4'><button type="submit" className="btnSubmit mt-4" >Créer un profil</button></div>
                <div className='text-white text-center pb-5'>Déjà inscrit ? <Link className='text-white' to="/">Connectez-vous</Link></div>
          </form>
      );
  }
}

export default SignupForm;
