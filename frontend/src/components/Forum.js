import '../styles/Forum.css'
//import { Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
//import Profil from './Profil';
//import logo from '../assets/icon.png'
import PostItem from './PostItem';
import ProfileCard from './ProfileCard';
import { PostList } from '../datas/PostList';
import NewPost from './NewPost';
import MemberItem from './MemberItem';
import MemberItem2 from './MemberItem2';
import NewComment from './NewComment';
import { Component } from 'react';
import axios from 'axios';


class Forum extends Component {

    state = {
        users: [],
        posts: []
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllPosts()
    }

    getAllUsers() {
        axios.get('http://localhost:3000/api/auth/users')
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    getAllPosts() {
        axios.get('http://localhost:3000/api/posts')
            .then(res => {
                this.setState({ posts: res.data });
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    render() {
        let { users } = this.state;
        let { posts } = this.state;

        return  (
            <div> <Banner />
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-3 ">
                        <ProfileCard />
                        <div className='membres fw-bold mb-2 ms-2 '>MEMBRES</div>
                        <div className='scroll2 member-list border rounded p-2 ms-2'>
                            {users.map(({ name, id, email }) => (
                                <div key={id}>
                                    <MemberItem
                                        name={name}
                                        member_id={id}
                                        email={email}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='scroll3 member-list2 d-flex mb-3 p-2'>
                            {users.map(({ name, id, email }) => (
                                <div key={id}>
                                    <MemberItem2
                                        name={name}
                                        member_id={id}
                                        email={email}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                        
                    <div className="col-12 col-lg-9">
                        <NewPost />
                        <div className='last-post pt-3 pb-3 ms-2 fw-bold'>DERNIERS POSTS</div>
                        <div className='scroll post-list'>
                            {posts.map(({ content,image,id,createdAt }) => (
                                <div className="border rounded mb-4" key={id}>
                                    <PostItem 
                                        image={image}
                                        content={content}
                                        post_id={id}
                                        date= {createdAt}
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
}

export default Forum;
