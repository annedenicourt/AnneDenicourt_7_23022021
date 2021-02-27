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
import MemberItem2 from './MemberItem2';
import NewComment from './NewComment';


function Forum() {
        

return  (
    <div> <Banner />
        <div className="row justify-content-center">
            <div className="col-12 col-lg-3 ">
                <ProfileCard />
                <div className='membres fw-bold mb-2 ms-2 '>MEMBRES</div>
                <div className='scroll2 member-list border rounded p-2 ms-2'>
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
                <div className='scroll3 member-list2 d-flex mb-3 p-2'>
                    {MemberList.map(({ picture, name, member_id, service }) => (
                        <div key={member_id}>
                            <MemberItem2
                                picture={picture}
                                name={name}
                                member_id={member_id}
                                service={service}
                            />
                        </div>
                    ))}
                </div>
            </div>
                
            <div className="col-12 col-lg-9">
                <NewPost />
                <div className='last-post pt-3 pb-3 ms-2 fw-bold'>DERNIERS POSTS</div>
                <div className='scroll post-list'>
                    {PostList.map(({ picture, description,post_id }) => (
                        <div key={post_id}>
                            <PostItem
                                picture={picture}
                                description={description}
                                id={post_id}
                            />
                            <NewComment />
                        </div>
                    ))}
                                
                </div>
            </div>   
        </div>
        <Footer />
    </div>)
}
export default Forum
