import '../styles/Profil.css'
import { Link } from 'react-router-dom';
import { Component } from 'react';
import Banner from './Banner';
import Footer from './Footer';
import avatar from '../assets/avatar2.png'
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class Profil extends Component {

    state = {
        user: {},
        file: "",
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 4 / 4,
        },
        croppedImageUrl: null,
        croppedImage: null,
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
        formData.append('image', this.state.croppedImage);
        console.log(formData)

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
                    localStorage.clear()
                    window.location.href = '/';
                })
                .catch(err => {
                    console.log(err);
                    window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                })
    }

    onSelectFile = e => {
        let filename = e.target.files[0];
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
            this.setState({ src: reader.result })
            );
            reader.readAsDataURL(filename);
            this.setState({
            file: filename
            });
        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };
    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };
    onCropComplete = crop => {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
            console.log(this.state.croppedImageUrl)
        }
    };
    
    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
            console.log(reader.result)
        })
    }

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
               
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage })
        console.log(this.state.croppedImage)
    } 

    reset = () => {
        window.location.reload()
    }

    render() {
        let { user, file } = this.state;
        const { crop, croppedImageUrl, src } = this.state;

        return  (
            <div className="bg-profilepage"> 
                <Banner />
                <div className="row">
                    <div className="col-8 col-lg-4 mt-5 mx-auto rounded bg-profile" >
                        <div className='avatar rounded-circle mx-auto'>
                            { user.UserImage === null ?
                                <img className='rounded-circle' height="150px" src={avatar} alt="avatar"/> 
                                : <img className='rounded-circle' height="150px" src={user.UserImage} alt="avatar"/>
                	        }
                        <i className="delete_picture bi bi-x-circle-fill text-white" title="Supprimer la photo de profil" onClick={this.handleDeletePicture}></i>
                        </div>
                        <div className='text-center mt-4'>
                            <label className="label-file text-white mb-3" htmlFor="image">Choisir une image</label>
                            <input name="image" id="image" className="input-file text-white" type="file" accept="image/*" onChange={this.onSelectFile} ref={this.fileInput} ></input>
                            <div id="imgstore"></div> 
                            
                            <div>

                            {src && (
                            <ReactCrop src={src} crop={crop} ruleOfThirds circularCrop
                            onImageLoaded={this.onImageLoaded} onComplete={this.onCropComplete} onChange={this.onCropChange}
                            />
                            )}
                            {croppedImageUrl && (
                             <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                            )}
                            { file ?
                                <button type="submit" className="button-file btn p-2 mt-4 mb-4 me-2" onClick={this.handleSubmit}>Ajouter</button>
                                : ''
                            }
                            { file ?
                                <button type="button" className="button-file btn p-2 mt-4 mb-4" onClick={this.reset}>Annuler</button>
                                : ''
                            }
                            </div>
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
