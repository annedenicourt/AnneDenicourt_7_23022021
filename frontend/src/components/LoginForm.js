import '../styles/LoginForm.css'
import { Component } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

class LoginForm extends Component {

    state = {
        fields: {
            email: '',
            password: ''
        },
        errors: {}
    }

    handleValidation() {
    let { fields } = this.state;
    let formIsValid = true
    let errors = {};
      
    // validation email 
        if (!fields['email']) {
            formIsValid = false;
            errors['email'] = 'Ce champ ne peut pas être vide';
        }
    // validation password 
        if (!fields['password']) {
            formIsValid = false;
            errors['password'] = 'Ce champ ne peut pas être vide';
        }
        this.setState({ errors });
        return formIsValid;
    }

    handleFormSubmit = (event) => {
    event.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;
            axios.post('http://localhost:3000/api/auth/login', {
                email: fields['email'],
                password: fields['password']
            }) 
            .then(res => {
                window.localStorage.setItem('token', res.data.token)
                window.localStorage.setItem('role', res.data.role)
                window.location.href = "/forum";
            })
            .catch(error=>Swal.fire('Attention', 'Email ou mot de passe incorrect', 'warning'))
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
            <h3 className='text-center text-white mb-4 border-bottom pt-4 pb-2'>SE CONNECTER</h3>
            <label htmlFor="email" className="form-label text-white">Adresse mail *</label>
            <input type="email" name="email" id="email" className="form-control mb-4" placeholder="Votre adresse mail" value={this.state.fields['email']} onChange={this.handleChange}/>
            {errors['email'] ? 
                <p className="err_message2">{errors['email']}</p>
                : '' 
            }
            <label htmlFor="password" className="form-label text-white">Mot de passe *</label>
            <input type="password" name="password" id="password" className="form-control mb-4" placeholder="Votre mot de passe" value={this.state.fields['password']} onChange={this.handleChange}/>
            {errors['password'] ? 
                <p className="err_message2">{errors['password']}</p>
                : '' 
            }
            <div className='text-center'><button type="submit" className="btnSubmit2 mt-4" >Se connecter</button></div>
            <div className='text-center text-white mt-5 mb-4 pb-4'>* Champs obligatoires</div>
        </form>
    );
  }
}

export default LoginForm;
