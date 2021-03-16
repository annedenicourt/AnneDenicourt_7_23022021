import '../styles/CommentItem.css'
import axios from 'axios';
import { Component } from 'react';


class ButtonLikePost extends Component {

    state = {
        like_posts: [],
        likes: '',
        liked: false
    }
    

    render() {
        let { like_posts } = this.state;

        return  (
            <div className="border-top">{like_posts.id}
            { this.state.liked ?
            <button className="like_post mt-2 text-primary" onClick={this.handleClick} title="Cliquez pour ne plus aimer"><i className="bi bi-hand-thumbs-up-fill me-1"></i>J'aime</button>
            : <button className="like_post mt-2" title="Cliquez pour aimer"><i className="bi bi-hand-thumbs-up me-1"></i>J'aime</button>
            }

            <div className=''>
                        {like_posts.map(like_post => (
                            <div key={like_post.id}>
                    	        <div>Like:{like_post.id}/Like_userId:{like_post.OwnerId}/CurrentUser:{this.props.UserId}</div>
                                { this.state.liked && like_post.OwnerId === this.props.UserId ?
                                <button className="like_post mt-2 text-primary" onClick={this.handleClick} title="Cliquez pour ne plus aimer"><i className="bi bi-hand-thumbs-up-fill me-1"></i>J'aime</button>
                                : <button className="like_post mt-2" onClick={this.handleClick} title="Cliquez pour aimer"><i className="bi bi-hand-thumbs-up me-1"></i>J'aime</button>
                            }

                            </div>
                        ))}    
                    </div>


		</div>
			
           )
    }
}
export default ButtonLikePost;