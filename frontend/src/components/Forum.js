import '../styles/Forum.css'
import Banner from './Banner';
import Footer from './Footer';
import PostItem from './PostItem';
import ProfileCard from './ProfileCard';
import NewPost from './NewPost';
import MemberItem from './MemberItem';
import MemberItem2 from './MemberItem2';
import { Component } from 'react';
import axios from 'axios';


class Forum extends Component {

    state = {
        users: [],
        posts: [],
        user: {}
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllPosts();
        this.getCurrentUser();
    }
    getAllUsers() {
        axios.get('http://localhost:3000/api/users')
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
                //console.log(res.data)
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    getCurrentUser() {
        const token = localStorage.getItem("token");

        axios.get('http://localhost:3000/api/users/monprofil',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ user: res.data });
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    render() {
        let { users } = this.state;
        let { posts } = this.state;
        let { user } = this.state;
        
        return  (
            <div> <Banner />
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-3 ">
                        <div>
                            <ProfileCard
                                name={user.UserName}
                                image={user.image}
                                job={user.job}
                            />
                        </div>
                        <div className='membres fw-bold mb-2 ms-2 '>MEMBRES</div>
                        <div className='scroll2 member-list border rounded p-2 ms-2'>
                            {users.map(({ name, id, job, image }) => (
                                <div key={id}>
                                    <MemberItem
                                        name={name}
                                        member_id={id}
                                        job={job}
                                        image={image}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='scroll3 member-list2 d-flex mb-3 p-2'>
                            {users.map(({ name, id, job, image }) => (
                                <div key={id}>
                                    <MemberItem2
                                        name={name}
                                        member_id={id}
                                        job={job}
                                        image={image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                        
                    <div className="col-12 col-lg-9">
                        <NewPost image={user.image} />
                        <div className='last-post pt-3 pb-3 ms-2 fw-bold'>DERNIERS POSTS</div>
                        <div className='scroll post-list'>
                            {posts.map(post=> (
                                <div className="border rounded mb-4" key={post.id}>
                                    <PostItem 
                                        post={post}
                                        UserId={user.UserId}
                                    />
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
