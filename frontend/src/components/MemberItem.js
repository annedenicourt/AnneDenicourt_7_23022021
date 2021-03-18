import '../styles/MemberItem.css'
import avatar from '../assets/avatar2.png'

function MemberItem({ name, image, job}) {
	
	return ( 
    <div className=''>
		<div className="align-items-center">
			<ul className="member-item p-0">
				<li className="d-flex rounded-circle mx-auto">
					{ image === null ?
                        <img className='rounded-circle me-2' height="40"  src={avatar} alt="avatar"/> 
                        : <img className='rounded-circle me-2' height="40" width="40" src={image} alt="avatar"/>
                	}
					<div className="member-info">
						<div>{name}</div>
						<div className="member-service text-muted fst-italic ">{job}</div>
					</div>
				</li>
			</ul>
    	</div>
	</div>
	)
}

export default MemberItem