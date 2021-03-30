import '../styles/NewPost.css';
import avatar from '../assets/avatar2.png';
import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

class NewPost extends Component {

    state = {
        fields: {
            content: '',
        },
        errors: {},
        file: "",
    }
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.newPostForm = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let { fields } = this.state;
        const token = localStorage.getItem("token");
        let formData = new FormData();
        formData.append('content', fields['content']);
        formData.append('image', this.fileInput.current.files[0]);

        if (!fields['content'] && this.state.file === "") {
            Swal.fire('Attention', 'Votre post ne peut pas être vide', 'warning')
            return false
        }
        
        axios.post('http://localhost:3000/api/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                const post = res.data.post;
                post.User =  {name: this.props.user.UserName, image: this.props.user.UserImage, id: this.props.user.UserId, role: this.props.user.UserRole }
                this.props.addPost(post);

                this.newPostForm.current.reset()
                this.setState({ fields: { content: '' } })
                this.setState({file: ""})
                var store = document.getElementById('imgstore');
                store.innerHTML=""
            })
            .catch(error=>console.log(error))
    }

    handleChange = (event) => {
        let { fields } = this.state;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    }

    imageHandler = (e2) => {
        var store = document.getElementById('imgstore');
        store.innerHTML='<img width="200" src="' + e2.target.result +'"/>';
    }

    loadimage = (e1) => {
        let filename = e1.target.files[0]; 
        let fr = new FileReader();
        fr.onload = this.imageHandler;  
        fr.readAsDataURL(filename);
        this.setState({ file: filename })
    }

    reset = () => {
        window.location.reload()
    }

    render() {
        let { file } = this.state;

        return (
            <form className="border ms-2 mb-3 bg-white" onSubmit={this.handleSubmit} ref={this.newPostForm}>
                
                <div className="d-flex p-3">
                    { this.props.currentUserImage === null ?
                        <img className='rounded-circle me-3' height="50" width="50" src={avatar} alt="avatar"/> 
                        : <img className='rounded-circle me-3' height="50" width="50" src={this.props.currentUserImage} alt="avatar"/>
                	}
                    <label htmlFor="content"></label>
                    <textarea name="content" id="content" rows="5" className="p-3 border rounded" placeholder="Ecrivez quelque chose..." value={this.state.fields['content']} onChange={this.handleChange}/>
                </div>
                <div className="attachments me-4 mb-3">
                    <label htmlFor="image" className="btn_add_file"><i className="bi bi-image me-2" title="Ajouter une image"></i></label>
                    <input type="file" name="image" id="image" className="add_file" onChange={this.loadimage} ref={this.fileInput} />
                    <button className="button_publish btn mb-2" type="submit" >Publier</button>
                    <div id="imgstore"></div>
                    { file ?
                        <button type="button" className="btn btn-outline-secondary p-2 mt-4 mb-4" onClick={this.reset}>Annuler</button>
                        : ''
                    }
                </div>
            </form>
        )
    }
}
export default NewPost;


            
            