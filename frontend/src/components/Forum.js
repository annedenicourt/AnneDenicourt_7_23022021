import '../styles/Forum.css'
//import { Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
//import Profil from './Profil';
//import logo from '../assets/icon.png'
import PostItem from './PostItem';
import ProfileCard from './ProfileCard';
import { PostList } from '../datas/PostList';
import { MemberList } from '../datas/MemberList'
import NewPost from './NewPost';
import MemberItem from './MemberItem';


function Forum() {
        

return  (<div> <Banner />
        <div className="row">
                <div className="col-3 text-center border-end">
                <ProfileCard />
                </div>
                <div className="scroll col ">
                        <NewPost />
                        <div className='p-3 fw-bold'>DERNIERS POSTS PUBLIES</div>
                        <div className='post-list text-center'>
                                {PostList.map(({ picture, description,post_id }) => (
                                <div key={post_id}>
		                <PostItem
                                        picture={picture}
		                        description={description}
		                        id={post_id}
                                />
                                </div>
                                ))}
                        </div>
                </div>
                <div className="col-2 border-start">
                        <div className='text-center fw-bold mb-4 border-bottom pb-2'>MEMBRES</div>
                <div className='member-list'>
                                {MemberList.map(({ picture, name, member_id, service }) => (
                                <div key={member_id}>
		                <MemberItem
                                        picture={picture}
		                        name={name}
                                        member_id={member_id}
                                        service={service}
                                />
                                </div>
                                ))}
                        </div>
                
                
                </div>
                
        </div>
        <Footer />
        </div>)
}
export default Forum
