import '../styles/Profil.css'
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import avatar from '../assets/avatar2.png'
import React from 'react';
import axios from 'axios';
import { Component } from 'react';



class Profil extends Component {

    state = {
        user: {}
    }

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
      }

    componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        const token = localStorage.getItem("token");

        axios.get('http://localhost:3000/api/users/monprofil',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ user: res.data });
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");

        let formData = new FormData();
        formData.append('image', this.fileInput.current.files[0]);
        console.log(formData)

        axios.put('http://localhost:3000/api/users/monprofil',formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ user: res.data });
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    handleDelete() {
            const token = localStorage.getItem("token");

            axios.delete('http://localhost:3000/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    window.location.href = '/';
                })
                .catch(err => {
                    console.log(err);
                    window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                })
    }

    render() {
        let { user } = this.state;

        return  (
            <div className="bg-profilepage"> 
                <Banner />
                <div className="row">
                    <div className="col-8 col-lg-5 mt-5 mx-auto rounded bg-profile" >
                        <div className='avatar rounded-circle mx-auto'>
                            { user.image === null ?
                                <img className='rounded-circle' height="200px" src={avatar} alt="avatar"/> 
                                : <img className='rounded-circle' height="200px" src={user.image} alt="avatar"/>
                	        }
                        </div>
                        <div className='text-center'>
                            <label htmlFor="file"></label>
                            <input name="image" id="image" className="input-file" type="file" ref={this.fileInput}></input>
                            <button type="submit" className="label-file p-2 mt-4 mb-4" onClick={this.handleSubmit}>Ajouter/modifier photo</button>
                        </div>
                        <div className="pb-4 pe-4 ps-4">
                            <h5 className=" text-white mb-4">Informations</h5>
                            <div className="border-bottom text-white mb-2">Nom/Pseudo</div>
                            <div className="text-muted mb-4 d-flex justify-content-between align-items-center">{user.UserName}</div>
                            <div className="border-bottom text-white mb-2">Email</div>
                            <div className="text-muted mb-4 d-flex justify-content-between align-items-center">{user.email}</div>
                            <div className="border-bottom text-white mb-2">Poste</div>
                            <div className="text-muted mb-4 d-flex justify-content-between align-items-center">{user.job}</div>
                            <div className="border-bottom text-white mb-2">Mon compte</div>
                            <div className="text-muted mb-4"><i className="bi bi-x-circle me-2"></i>Supprimer mon compte</div>
                            <div className="text-muted mb-4"><i className="bi bi-pencil-square me-2"></i>Modifier mon compte</div>
                            <div className="text-muted mb-4"><i className="bi bi-pencil me-2"></i>Modifier mon compte</div>
                        </div>
                    </div>
                    <div className="mt-5 mb-5 text-center"><Link to="/forum"><button className="bouton2 border-0 ">Accès forum</button></Link></div>
                </div>
                <Footer />
            </div>)
        }
    }

export default Profil
