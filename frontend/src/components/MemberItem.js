import '../styles/MemberItem.css'
import avatar from '../assets/avatar2.png'

function MemberItem({ name, id, email}) {
	
	return ( 
    <div className=''>
		<div className="align-items-center">
			<ul className="member-item p-0">
				<li className="d-flex">
					<img className='me-2' src={avatar} height='40' alt=""/>
					<div className="member-info">
						<div>{name}</div>
						<div className="member-service text-muted fst-italic ">{email}</div>
					</div>
				</li>
			</ul>
    	</div>
	</div>
	)
}

export default MemberItem