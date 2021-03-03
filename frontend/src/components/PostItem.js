import avatar from '../assets/avatar2.png'

function PostItem({ content, image, post_id, date}) {
	
	return (
		<div className='post-item p-3 mb-3'>
			<div className="user-post">
				<div className="d-flex align-items-center">
						<img className='me-3 mb-3' src={avatar} height='40' alt=""/>
					<div className="">
						<a href="time-line.html" title="">Name_Member</a>
						<span> a publié le {date}</span>
					</div>
				</div>
							
				<div className="post-meta">
					<img className="w-100" src={image}  alt=""/>
					<div className="description mt-3">{content}</div>
					<div className="">
						<span className="like"><i className="bi bi-hand-thumbs-up" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cliquez pour aimer"></i></span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostItem