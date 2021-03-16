import avatar from '../assets/avatar2.png';
import CommentItem from './CommentItem';
import NewComment from './NewComment';
import { Component } from 'react';
import axios from 'axios';
import '../styles/PostItem.css'
import ButtonLikePost from './ButtonLikePost';


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
                //console.log(res.data)
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
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
                //console.log(res.data)
                //console.log(this.state.liked)
                let {like_posts} = this.state
                const alreadyLike = like_posts.filter(like => like.OwnerId === this.props.UserId ).length>0
                console.log(alreadyLike)
                if(alreadyLike) {
                    this.setState({ liked: true });
                }
                console.log(this.state.liked)
            })
            .catch(err => {
                console.log(err);
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

    handleClick() {
        let {like_posts} = this.state
        this.setState({
            liked: !this.state.liked
          });
        
        /*if(this.state.liked === false){
            let newCount = this.state.likes + 1;
            this.setState({likes: newCount});
        } else {
            let newCount = this.state.likes - 1;
            this.setState({likes: newCount});
        }*/                  
        const token = localStorage.getItem("token");
        const likeId = like_posts.map(function (like) {return like.id;});
        console.log(likeId)


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
                    console.log(like_posts)
                    window.location.reload()
                })
                .catch(error=>console.log(error))
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
                        <i className="bi bi-hand-thumbs-up me-1">{this.state.likes}</i>
						<div className="border-top">
                            { this.state.liked === true ?
                            <button className="like_post mt-2 text-primary" onClick={this.handleClick} title="Cliquez pour ne plus aimer"><i className="bi bi-hand-thumbs-up-fill me-1"></i>J'aime</button>
                            : <button className="like_post mt-2" onClick={this.handleClick} title="Cliquez pour aimer"><i className="bi bi-hand-thumbs-up me-1"></i>J'aime</button>
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