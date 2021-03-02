import '../styles/NewPost.css';
import avatar from '../assets/avatar2.png';
import React, { Component } from 'react';
import axios from 'axios';


class NewPost extends Component {

    state = {
        fields: {
            content: ''
        },
        errors: {}
    }

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.newPostForm = React.createRef();
    }

    handleValidation() {
        let { fields } = this.state;
        let formIsValid = true;
        let errors = {};

        // Content field validation
        if (!fields['content']) {
            errors['content'] = 'Votre post ne peut pas être vide';
        }
        this.setState({ errors });

        return formIsValid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;

            //let formData = new FormData();
            //formData.append('content', content);
            //formData.append('image', this.fileInput.current.files[0]);

            axios.post('http://localhost:3000/api/posts', {
                content: fields['content'],
        }) 
                .then(res => {
                    this.newPostForm.current.reset();
                    this.setState({ fields: { content: '' } });
                })
                .catch(error=>console.log(error))
        }
    }

    handleChange = (event) => {
        let { fields } = this.state;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    }

    render() {
        let { errors } = this.state;
        return (
            <form className="border mb-3" onSubmit={this.handleSubmit} ref={this.newPostForm}>
                <div action="" className="new-postbox d-flex p-3">
                    <img className='me-3' src={avatar} height='50' alt=""/>
                    <label htmlFor="content"></label>
                    <textarea name="content" id="content" rows="5" className="p-3" placeholder="Ecrivez quelquechose..." value={this.state.fields['content']} onChange={this.handleChange}/>
                    <div className="attachments">
                        <label htmlFor="image" className="btn_add_file"><i className="bi bi-image me-2" title="Ajouter une image"></i></label>
                        <input type="file" name="image" id="image" className="add_file" ref={this.fileInput} />
                        <button type="submit">Publier</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default NewPost;


            
            