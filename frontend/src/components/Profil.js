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
        user: {},
        file: ""
    }

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        //this.handleSubmit = this.handleSubmit.bind(this);

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

        if (!this.fileInput.current.files[0]) {
            alert("Vous devez choisir une photo")
            return false
        }

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

    handleDeletePicture = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        let formData = new FormData();
        formData.append('image', this.fileInput.current.files[0]);

        axios.put('http://localhost:3000/api/users/monprofil/mypicture',formData,{
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

            axios.delete('http://localhost:3000/api/users/monprofil', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    alert("Votre compte a bien été supprimé")
                    window.location.href = '/';
                })
                .catch(err => {
                    console.log(err);
                    window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                })
    }

    imageHandler = (e2) => {
        var store = document.getElementById('imgstore');
        store.innerHTML='<img width="200" src="' + e2.target.result +'"/>';
    }

    loadimage = (e1) => {
        var filename = e1.target.files[0]; 
        var fr = new FileReader();
        fr.onload = this.imageHandler;  
        fr.readAsDataURL(filename);
        this.setState({
            file: filename
          });
    }
    reset = () => {
        window.location.reload()
    }

    render() {
        let { user, file } = this.state;


        return  (
            <div className="bg-profilepage"> 
                <Banner />
                <div className="row">
                    <div className="col-8 col-lg-4 mt-5 mx-auto rounded bg-profile" >
                        <div className='avatar rounded-circle mx-auto'>
                            { user.image === null ?
                                <img className='rounded-circle' height="150px" src={avatar} alt="avatar"/> 
                                : <img className='rounded-circle' height="150px" src={user.image} alt="avatar"/>
                	        }
                        <i className="delete_picture bi bi-x-circle-fill text-white" title="Supprimer la photo de profil" onClick={this.handleDeletePicture}></i>
                        </div>
                        <div className='text-center mt-4'>
                            <label className="label-file text-white mb-3" htmlFor="image">Choisir une image</label>
                            <input name="image" id="image" className="input-file text-white" type="file" onChange={this.loadimage} ref={this.fileInput}></input>
                            <div id="imgstore"></div>
                            { file ?
                                <button type="submit" className="button-file btn p-2 mt-4 mb-4 me-2" onClick={this.handleSubmit}>Ajouter</button>
                                : ''
                            }
                            { file ?
                                <button type="submit" className="button-file btn p-2 mt-4 mb-4" onClick={this.reset}>Annuler</button>
                                : ''
                            }
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
                            <button className="btn_delete text-muted mb-4" onClick={this.handleDelete}><i className="bi bi-x-circle me-2"></i>Supprimer mon compte</button>
                        </div>
                    </div>
                    <div className="mt-5 mb-5 text-center"><Link to="/forum"><button className="bouton2 border-0 ">Accès forum</button></Link></div>
                </div>
                <Footer />
            </div>)
        }
    }

export default Profil
