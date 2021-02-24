import '../styles/MemberItem.css'

function MemberItem2 ({ picture, name, member_id, service}) {
	
	return ( 
    <div className='ps-2'>
			<div className="member-item2 me-4 ">
				<img className='me-2' src={picture} height='40' alt=""/>
				<div className="member-info2">
					{name}
				</div>
			</div>
	</div>
	)
}

export default MemberItem2