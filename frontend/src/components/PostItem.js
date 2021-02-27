import avatar from '../assets/avatar2.png'

function PostItem({ picture, description, id}) {
	let date1 = new Date();
        let dateLocale = date1.toLocaleString('fr-FR',{
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'});
	return (
		<div className='post-item border rounded p-3 mb-3'>
			<div className="user-post">
				<div className="friend-info d-flex align-items-center">
					<figure>
						<img className='me-3' src={avatar} height='50' alt=""/>
					</figure>
					<div className="friend-name">
						<a href="time-line.html" title="">Name_Member</a>
						<span> a publié le {dateLocale}</span>
					</div>
				</div>
				
				<div className="post-meta">
					<img className="w-100"src={picture}  alt=""/>
					<div className="description mt-3">{description}</div>
					<div className="we-video-info">
						<i className="bi bi-hand-thumbs-up me-1"></i>
                    	<i className="bi bi-emoji-frown me-1"></i>
                    	<i className="bi bi-emoji-angry me-1"></i>
                    	<i className="bi bi-emoji-laughing"></i>
						<span className="like" data-toggle="tooltip" title="like"><i className="bi bi-hand-thumbs-up"></i></span>
						<span className="dislike" data-toggle="tooltip" title="dislike"><i className="bi bi-hand-thumbs-down"></i></span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostItem