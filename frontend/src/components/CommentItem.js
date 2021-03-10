import avatar from '../assets/avatar2.png';
import '../styles/CommentItem.css'
//import { Component } from 'react';
//import axios from 'axios';


function CommentItem({ CommentId, content, UserId, date, UserName}) {
	
	return (
		<div className="mb-3 p-3">
            <div className="mb-2 text-muted">
                <img className='me-3' src={avatar} height='30' alt=""/>
				<a href="time-line.html" title="">{UserName}</a>      
                <span> a commenté le {new Date(date).toLocaleDateString('fr-FR')}</span>
				<span> à {new Date(date).toLocaleTimeString('fr-FR')}</span>
			</div>

            <div className="comment p-3 border" id='content_comment'>{content}</div>
            <div className="emojis">
                <i className="bi bi-hand-thumbs-up me-1"></i>
            </div>
        </div>
	)
}

export default CommentItem