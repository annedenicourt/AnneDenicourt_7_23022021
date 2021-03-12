import avatar from '../assets/avatar2.png';
import CommentItem from './CommentItem';
import NewComment from './NewComment';
import { Component } from 'react';
import axios from 'axios';
import '../styles/PostItem.css'


class PostItem extends Component {

    state = {
		comments: [],
	}

    componentDidMount() {
        this.getAllComments();
    }
    getAllComments() {
		
		axios.get('http://localhost:3000/api/posts/'+this.props.post.id+'/comments')
            .then(res => {
                this.setState({ comments: res.data });
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
	}

	handlePostDelete = (event) => {
			const token = localStorage.getItem("token");

            axios.delete('http://localhost:3000/api/posts/' + this.props.post.id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
			.then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    render() {
		let { comments } = this.state;
        return  (
			<div>
			<div className='post-item p-3 mb-3'>
				<div className="user-post">
					<div className="title_post d-flex align-items-center">
                    { this.props.post.User.image === null ?
                        <img className='rounded-circle me-3 mb-3' height="40"  src={avatar} alt="avatar"/> 
                        : <img className='rounded-circle me-3 mb-3' height="40" width="40" src={this.props.post.User.image} alt="avatar"/>
                	    }
						<div className="">
							<a href="time-line.html" title="">{this.props.post.User.name}</a>      
							<span> a publié le {new Date(this.props.post.createdAt).toLocaleDateString('fr-FR')} à {new Date(this.props.post.createdAt).toLocaleTimeString('fr-FR')}</span>
						</div>
						{ this.props.post.User.role && this.props.post.User.role.includes('Moderator') ?
                    		<button href="#" onClick={this.handlePostDelete} className="post_delete" title="Supprimer ce post"><i className="bi bi-x-circle"></i></button> : ''
                		}
					</div>
							
					<div className="">
						<div className="description mt-2 mb-2 ps-5">{this.props.post.content}</div>
						<figure className="text-center"><img className="w-75" src={this.props.post.image}  alt=""/></figure>
						<div className="border-top">
							<button className="like_post mt-2" title="Cliquez pour aimer"><i className="bi bi-hand-thumbs-up me-1"></i>J'aime</button>
						</div>
						
					</div>
				</div>
			</div>
			<NewComment PostId= {this.props.post.id}/>
			<div className=''>
                {comments.map(comment => (
                    <div key={comment.id}>
                    	<CommentItem 
                            content={comment.content}
                            PostId={comment.PostId}
                            date= {comment.createdAt}
							CommentId= {comment.id}
							UserName= {comment.User.name}
                            UserRole= {comment.User.role}
                            image= {comment.User.image}
                        />
                    </div>
                ))}    
            </div>
		</div>
           )
    }
}
export default PostItem;