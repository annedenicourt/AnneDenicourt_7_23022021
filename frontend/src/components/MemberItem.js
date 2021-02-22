import '../styles/MemberItem.css'

function MemberItem({ picture, name, member_id, service}) {
	
	return ( 
    <div className='mb-4 border-bottom pb-3'>
	    <div className='member-infos d-flex mb-2 align-items-center'>
		    <img className='me-2' src={picture} height='40' alt=""/>
		    <div className="member-info">
            <div>{name}</div>
            <div className="member-service text-muted fst-italic pt-1">{service}</div>
            </div>
	    </div>
        
    </div>
	)
}

export default MemberItem