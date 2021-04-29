import '../styles/CommentItem.css'
import avatar from '../assets/avatar2.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CommentItem(props) {

    function handleCommentDelete() {
        const token = localStorage.getItem("token");
        axios.delete('http://localhost:3000/api/comments/'+props.CommentId, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                props.deleteComment(props.CommentId);
            })
            .catch(error=>console.log(error))
    }
	
	return (
		<div className="p-3">
            <div className="title_comment mb-2 text-muted">
                { props.image === null ?
                    <img className='rounded-circle me-3' height="30"  src={avatar} alt="avatar"/> 
                    : <img className='rounded-circle me-3' height="30" width="30" src={props.image} alt="avatar"/>
                }
                <Link className="" to ={{ pathname: `/user/${props.OwnerId}`}}>{props.UserName}</Link>     
                <span> a commenté le {new Date(props.date).toLocaleDateString('fr-FR')}</span>
				<span> à {new Date(props.date).toLocaleTimeString('fr-FR')}</span>
                { props.currentUserId === props.OwnerId ?
                    <button href="#" className="comment_delete" onClick={handleCommentDelete} title="Supprimer ce commentaire"><i className="bi bi-x-circle"></i></button> : ''
                }
                { props.currentUserRole === 'Moderator' ?
                    <button href="#" className="comment_delete" onClick={handleCommentDelete} title="Supprimer ce commentaire"><i className="bi bi-x-circle"></i></button> : ''
                }
			</div>
            <div className="p-3 border" id='content_comment'>{props.content}</div>
        </div>
	)
}
export default CommentItem