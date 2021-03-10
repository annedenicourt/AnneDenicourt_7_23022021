import avatar from '../assets/avatar2.png';
import CommentItem from './CommentItem';
import NewComment from './NewComment';
import { Component } from 'react';
import axios from 'axios';


class PostItem extends Component {

    state = {
		comments: [],
	}

    componentDidMount() {
        this.getAllComments();
    }
    getAllComments() {
        axios.get('http://localhost:3000/api/comments')
            .then(res => {
                this.setState({ comments: res.data });
            })
            .catch(err => {
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
					<div className="d-flex align-items-center">
						<img className='me-3 mb-3' src={avatar} height='40' alt=""/>
						<div className="">
							<span> Post n°{this.props.post.id}</span>
							<span> User n°{this.props.post.UserId}</span>
							<a href="time-line.html" title="">{this.props.post.User.name}</a>      
							<span> a publié le {new Date(this.props.post.createdAt).toLocaleDateString('fr-FR')}</span>
							<span> à {new Date(this.props.post.createdAt).toLocaleTimeString('fr-FR')}</span>
						</div>
					</div>
							
					<div className="post-meta">
						<div className="description mt-3 mb-5 ps-5">{this.props.post.content}</div>
						<figure className="text-center"><img className="w-75" src={this.props.post.image}  alt=""/></figure>
						<div className="">
							<span className="like"><i className="bi bi-hand-thumbs-up" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cliquez pour aimer"></i></span>
						</div>
					</div>
				</div>
			</div>
			<NewComment PostId= {this.props.post.id}/>
			<div className=''>
                {comments.map(({ content,id,createdAt, UserId, UserName }) => (
                    <div className="mb-4" key={id}>
                    	<CommentItem 
                            content={content}
                            UserId={UserId}
                            UserName= {UserName}
                            date= {createdAt}
                            CommentId= {id}
                        />
                    </div>
                ))}    
            </div>
		</div>
           )
    }
}
export default PostItem;