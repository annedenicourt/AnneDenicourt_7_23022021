import '../styles/MemberItem.css'
import avatar from '../assets/avatar2.png'


function MemberItem2 ({ name, id, email}) {
	
	return ( 
    <div className='mx-3'>
		<div className="member-item2 text-center">
			<img className='' src={avatar} height='40' alt=""/>
			<div className="member-info2">{name}</div>
		</div>
	</div>
	)
}

export default MemberItem2