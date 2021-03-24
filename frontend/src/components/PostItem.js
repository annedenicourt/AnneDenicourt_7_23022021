import '../styles/PostItem.css'
import avatar from '../assets/avatar2.png';
import { Component } from 'react';
import CommentItem from './CommentItem';
import NewComment from './NewComment';
import axios from 'axios';

class PostItem extends Component {

    state = {
        comments: [],
        like_posts: [],
        likes: '',
        liked: false,
    }
    
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
      } 

    componentDidMount() {
        this.getAllComments();
        this.getAllLikePost()
    }
    getAllComments() {
        const token = localStorage.getItem("token");

		axios.get('http://localhost:3000/api/posts/'+this.props.post.id+'/comments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ comments: res.data });
            })
            .catch(err => {
                console.log(err);
                alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }
    
    getAllLikePost() {
        const token = localStorage.getItem("token");

		axios.get('http://localhost:3000/api/posts/'+this.props.post.id+'/likes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ like_posts: res.data });
                let {like_posts} = this.state
                const likeOwner = like_posts.map(function (like) {return like.OwnerId;});
                if(likeOwner.includes(this.props.currentUserId)){
                    this.setState({ liked: true });
                }
            })
            .catch(err => {
                console.log(err);
                alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
	}

	handlePostDelete = () => {
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

    handleClick() {
        let {like_posts} = this.state
        this.setState({
            liked: !this.state.liked
        });           
        const token = localStorage.getItem("token");
        const likeId = like_posts.map(function (like) {return like.id;});

        axios.post('http://localhost:3000/api/posts/like', {
            like: this.state.liked,
            PostId: this.props.post.id,
            LikeId: likeId

            },{ headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch(error=>console.log(error))
    }


    render() {
        let { comments, like_posts } = this.state;
        const likeOwnerName = like_posts.map(function (like) {return like.User.name;});

        return  (
			<div>
			<div className='post-item p-3 mb-3'>
				<div className="user-post">
					<div className="title_post d-flex align-items-center">
                        { this.props.post.User.image === null ?
                        <img className='rounded-circle me-3 mb-3' height="40"  src={avatar} alt="avatar"/> 
                        : <img className='rounded-circle me-3 mb-3' height="40" width="40" src={this.props.post.User.image} alt="avatar"/>
                	    }
						<div className="details_post">
							<a className="me-2" href=" ">{this.props.post.User.name}</a>      
							<span className="date_post text-muted"> a publié le {new Date(this.props.post.createdAt).toLocaleDateString('fr-FR')} à {new Date(this.props.post.createdAt).toLocaleTimeString('fr-FR')}</span>
						</div>
                        { this.props.currentUserId === this.props.post.User.id ?
                    		<button onClick={this.handlePostDelete} className="post_delete" title="Supprimer ce post"><i className="bi bi-x-circle"></i></button> : ''
                		}
                        { this.props.currentUserRole === 'Moderator' ?
                    		<button onClick={this.handlePostDelete} className="post_delete" title="Supprimer ce post"><i className="bi bi-x-circle"></i></button> : ''
                		}
					</div>
    
					<div className="content_post">
						<div className="description mt-2 mb-4 ps-5">{this.props.post.content}</div>
                            { this.props.post.image ?
						    <figure className="text-center"><img className="w-100" src={this.props.post.image}  alt=""/></figure>
                            : ''
                		    }
                            { this.props.post.likes >0 ?
                            <div className="count_likes me-4 mb-3"><i className="bi bi-hand-thumbs-up-fill me-1" title={likeOwnerName}></i>{this.props.post.likes}</div>
                            : ''
                		    }
						<div className="border-top border-bottom">
                            { this.state.liked === true ?
                            <button className="like_post mt-2 mb-2 text-primary" onClick={this.handleClick} title="Cliquez pour ne plus aimer"><i className="bi bi-hand-thumbs-up-fill me-1"></i>J'aime</button>
                            : <button className="like_post mt-2 mb-2" onClick={this.handleClick} title="Cliquez pour aimer"><i className="bi bi-hand-thumbs-up me-1"></i>J'aime</button>
                		    }
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
                            OwnerId= {comment.OwnerId}
							UserName= {comment.User.name}
                            currentUserRole= {this.props.currentUserRole}
                            currentUserId= {this.props.currentUserId}
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