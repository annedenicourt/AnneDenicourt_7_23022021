import '../styles/MemberItem.css'
import avatar from '../assets/avatar2.png'
import { Link } from 'react-router-dom';


function MemberItem2 ({ member_id, name, image, job}) {
	
	return ( 
    <div className='mx-3'>
		<div className="member-item2 text-center">
			{ image === null ?
                <img className='rounded-circle me-2' height="40"  src={avatar} alt="avatar"/> 
                : <img className='rounded-circle me-2' height="40" width="40" src={image} alt="avatar"/>
            }
			<div>
			<Link className="member-info2" to ={{
				pathname: `/user/${member_id}`
			}}>{name}</Link>
			</div>
			<div className="member-service text-muted fst-italic ">{job}</div>
		</div>
	</div>
	)
}

export default MemberItem2