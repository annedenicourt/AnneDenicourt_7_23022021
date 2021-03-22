import '../styles/SignupForm.css'
import { Component } from 'react';
import axios from "axios";


class SignupForm extends Component {

  state = {
      fields: {
          email: '',
          name: '',
          password: '',
          confirm_password:'',
          job: ''
      },
      errors: {}
  }

  handleValidation() {
    let { fields } = this.state;
    let errors = {};
    let formIsValid = true

    // validation name
    if (!fields['name']) {
        formIsValid = false;
        errors['name'] = 'Ce champ ne peut pas être vide'; 
    } else if (fields['name'].length < 3) {
        formIsValid = false;
        errors['name'] = 'Le nom d\'utilisateur doit contenir au minimum 3 caractères';  
    } else if (fields['name'].length > 20) {
        formIsValid = false;
        errors['name'] = 'Le nom d\'utilisateur doit contenir au maximum 20 caractères';
    }
      
    // validation email 
    if (!fields['email']) {
        formIsValid = false;
        errors['email'] = 'Ce champ ne peut pas être vide';
    } else if (!fields['email'].match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
        formIsValid = false;
        errors['email'] = 'L\'email n\'est pas valide';
    }

    // validation poste travail 
    if (!fields['job']) {
        formIsValid = false;
        errors['job'] = 'Ce champ ne peut pas être vide';
    }

    // validation confirm_password
    if (!fields['confirm_password']) {
        formIsValid = false;
        errors['confirm_password'] = 'Ce champ ne peut pas être vide';
    } else if (fields['confirm_password']!== fields['password']) {
        formIsValid = false;
        errors['confirm_password'] = 'Le mot de passe n\'est pas identique';
    }
    // validation password 
    if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(fields['password'])) {
        formIsValid = false;
        errors['password'] = '8 caractères min. dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial';
    }
    
    this.setState({ errors });
    return formIsValid

  }

  handleFormSubmit = (event,data) => {
    event.preventDefault();
    if (this.handleValidation()) {
        let { fields } = this.state;
        axios.post('http://localhost:3000/api/auth/signup', {
                email: fields['email'],
                name: fields['name'],
                password: fields['password'],
                job: fields['job']
        }) 
        .then(res => {
            window.localStorage.setItem('token', res.data.token)
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
          <form className='login-form-2 rounded' action="" method="post" noValidate onSubmit={this.handleFormSubmit}>
            <h3 className='text-center text-white mb-4 border-bottom pt-4 pb-2'>S'INSCRIRE</h3>

                <label htmlFor="name" className="form-label text-white">Nom/Pseudo *</label>
                <input type="text" name="name" id="name" className="form-control mb-4" placeholder="Votre nom d'utilisateur" value={this.state.fields['name']} onChange={this.handleChange}/>
                {errors['name'] ? (
                  <p className="err_message2">{errors['name']}</p>
                ) : '' }

                <label htmlFor="email" className="form-label text-white">Adresse mail *</label>
                <input type="email" name="email" id="email" className="form-control mb-4" placeholder="Votre adresse mail" value={this.state.fields['email']} onChange={this.handleChange}/>
                {errors['email'] ? (
                  <p className="err_message2">{errors['email']}</p>
                ) : '' }

                <label htmlFor="password" className="form-label text-white">Mot de passe *</label>
                <input type="password" name="password" id="password" className="form-control mb-4" placeholder="Votre mot de passe" value={this.state.fields['password']} onChange={this.handleChange}/>
                {errors['password'] ? (
                  <p className="err_message2">{errors['password']}</p>
                ) : '' }

                <label htmlFor="confirm-password" className="form-label text-white">Confirmation mot de passe *</label>
                <input type="password" className="form-control mb-4" name="confirm_password" id="confirm_password" placeholder="Confirmation mot de passe" value={this.state.fields['confirm_password']} onChange={this.handleChange}/>
                {errors['confirm_password'] ? (
                <p className="err_message2">{errors['confirm_password']}</p>
                ) : '' }

                <label htmlFor="job" className="form-label text-white">Poste occupé *</label>
                <input type="text" className="form-control mb-4" name="job" id="job" placeholder="Votre poste de travail" value={this.state.fields['job']} onChange={this.handleChange}/>
                {errors['job'] ? (
                <p className="err_message2">{errors['job']}</p>
                ) : '' }

                <div className='text-center mt-4 mb-4 pb-4'><button type="submit" className="btnSubmit mt-4" >Créer un profil</button></div>
          </form>
      );
  }
}

export default SignupForm;
