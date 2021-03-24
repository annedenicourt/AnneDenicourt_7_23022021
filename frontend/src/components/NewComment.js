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

    handleSubmit = (event) => {
        event.preventDefault();

        let { fields } = this.state;
        const token = localStorage.getItem("token");

        if (!fields['content']) {
            alert('Votre commentaire ne peut pas être vide')
            return false
        }

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

    handleChange = (event) => {
        let { fields } = this.state;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <form className="mb-3" onSubmit={this.handleSubmit}>
                <div className="new-comment d-flex p-3">
                    <img className='me-3' src={avatar} height='30' alt=""/>
                    <label htmlFor='content'></label>
                    <textarea className="form-control" name='content' id='content_newcomment' placeholder="Ecrivez un commentaire..." onChange={this.handleChange} value={this.state.fields['content']} />
                    <div className="send_comment">
                        <button className="comment-button" type="submit" title="Cliquez pour envoyer"><i className="bi bi-arrow-right-circle-fill"></i></button>
                    </div>
                </div>
            </form>
        )
    }
}
export default NewComment;