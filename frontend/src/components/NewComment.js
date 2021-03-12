import '../styles/NewComment.css'
import avatar from '../assets/avatar2.png'
import React, { Component } from 'react';
import axios from 'axios';


class NewComment extends Component {

    state = {
        fields: {
            content: ''
        },
        errors: {}
    }

    constructor(props) {
        super(props);
        this.newCommentForm = React.createRef();
    }

    handleValidation() {
        let { fields } = this.state;
        let formIsValid = true;
        let errors = {};

        if (!fields['content']) {
            errors['content'] = 'Votre commentaire ne peut pas être vide';
        }
        this.setState({ errors });

        return formIsValid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;

            const newComment ={
                content: fields['content'],
                PostId: this.props.PostId
            }
            console.log(newComment)

            const token = JSON.parse(localStorage.getItem("token"));
            console.log(token)

            axios.post('http://localhost:3000/api/comments', {
                content: fields['content'],
                PostId: this.props.PostId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    window.location.reload()

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
            <form className="mb-3" onSubmit={this.handleSubmit} ref={this.newCommentForm}>
                <div className="new-comment d-flex p-3">
                    <img className='me-3' src={avatar} height='30' alt=""/>
                    <label htmlFor='content'></label>
                    <textarea className="form-control" name='content' id='content_newcomment'  placeholder="Ecrivez un commentaire..." onChange={this.handleChange} value={this.state.fields['content']} />
                    {errors['content'] ? (
                        <span className="">{errors['content']}</span>
                    ) : '' }
                    <div className="emojis">
                        <button className="comment-button" type="submit"><i className="bi bi-arrow-right-circle-fill"></i></button>
                    </div>
                </div>
            </form>
        )
    }
}

export default NewComment;