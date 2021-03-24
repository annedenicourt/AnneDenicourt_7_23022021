import avatar from '../assets/avatar2.png';
import { Component } from 'react';
import axios from 'axios';
import Banner from './Banner';
import Footer from './Footer';
import PostItem from './PostItem';


class ProfileUser extends Component {

    state = {
        posts: [],
        user: {}
    }

    componentDidMount() {
        this.getAllPostsByUser();
        this.getOneUser()
    }

    getOneUser() {
        const token = localStorage.getItem("token");
        const { id } = this.props.match.params

        axios.get('http://localhost:3000/api/users/user/'+id, {
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

    getAllPostsByUser() {
        const token = localStorage.getItem("token");
        const { id } = this.props.match.params

        axios.get('http://localhost:3000/api/posts/users/'+id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            this.setState({ posts: res.data });
        })
        .catch(err => {
            console.log(err);
            window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
        })
    }

    render() {

    let {posts, user} = this.state

        return(
            <div className="row justify-content-center ">
            <Banner />
            <div className="col-12 col-lg-3 ">
                <div className="profile_card ms-2 ">
                    <div className="col bg-dark p-3 rounded mb-4">
                        <div className="text-center text-white">
                            <div className='avatar2 rounded-circle mx-auto'>
                                { user.image === null ?
                                    <img className='rounded-circle' height="130px" src={avatar} alt="avatar"/> 
                                    : <img className='rounded-circle' height="130px" src={user.image} alt="avatar"/>
                	            }
                            </div>
                            <h5 className="fw-bold mt-2 mb-3">{user.UserName}</h5>
                            <div className="fst-italic text-muted mt-4">{user.job} <br/>chez Groupomania</div>
                            <div className="mt-4">{user.email}</div>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="scroll col-12 col-lg-9">
                <div className='membres fw-bold mb-2 ms-2 '>SES DERNIÈRES PUBLICATIONS</div>
                {posts.map(post=> (
                    <div className="border rounded mb-4" key={post.id}>
                        <PostItem 
                        post={post}
                        />
                    </div>
                ))}
            </div>
            <Footer />   
        </div>
        )
    }
}
export default ProfileUser