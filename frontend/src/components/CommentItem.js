import avatar from '../assets/avatar2.png';
import '../styles/CommentItem.css'
import axios from 'axios';

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
                console.log(res.data)
                window.location.reload()
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
				<a href="time-line.html" title="">{props.UserName} </a>      
                <span> a commenté le {new Date(props.date).toLocaleDateString('fr-FR')}</span>
				<span> à {new Date(props.date).toLocaleTimeString('fr-FR')}</span>
                {props.UserRole && props.UserRole.includes('Moderator') ?
                <button href="#" className="comment_delete" onClick={handleCommentDelete} title="Supprimer ce post"><i className="bi bi-x-circle"></i></button> : ''
                }
			</div>
            <div className="p-3 border" id='content_comment'>{props.content}</div>
            <button className="like_comment mt-1 ms-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cliquez pour aimer">J'aime</button>
        </div>
	)
}

export default CommentItem