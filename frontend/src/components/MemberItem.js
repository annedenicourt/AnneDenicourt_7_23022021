import '../styles/MemberItem.css'

function MemberItem({ picture, name, member_id, service}) {
	
	return ( 
    <div className=''>
		<div className="align-items-center">
			<ul className="member-item p-0">
				<li className="d-flex">
					<img className='me-2' src={picture} height='40' alt=""/>
					<div className="member-info">
						<div>{name}</div>
						<div className="member-service text-muted fst-italic ">{service}</div>
					</div>
				</li>
			</ul>
    	</div>
	</div>
	)
}

export default MemberItem