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
					<div className="description mt-3 mb-5 ps-5">{content}</div>
					<figure className="text-center"><img className="w-75" src={image}  alt=""/></figure>
					<div className="">
						<span className="like"><i className="bi bi-hand-thumbs-up" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cliquez pour aimer"></i></span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostItem