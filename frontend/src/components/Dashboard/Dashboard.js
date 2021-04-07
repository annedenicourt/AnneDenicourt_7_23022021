import '../../styles/Dashboard.css';
import avatar from '../../assets/avatar2.png';
import { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import CountUp from 'react-countup';
import Footer from '../Footer';

class Dashboard extends Component {
    state = {
        users: [],
        posts: [],
        newUsers: [],
        newPosts:[]
    }

    componentDidMount() {
        this.getAllPosts();
        this.getAllUsers();
        this.getNewUsers();
        this.getNewPosts()
    }

    getAllUsers() {
        const token = localStorage.getItem("token");

        axios.get('http://localhost:3000/api/users',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    getNewUsers() {
        const token = localStorage.getItem("token");

        axios.get('http://localhost:3000/api/users/admin',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ newUsers: res.data });
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }
    getAllPosts() {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ posts: res.data });
            })
            .catch(err => {
                console.log(err);
                alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }
    getNewPosts() {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/api/posts/admin', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ newPosts: res.data });
            })
            .catch(err => {
                console.log(err);
                alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }
    
    render() {
        let { users, posts, newUsers, newPosts } = this.state
        let users_quantity = users.length
        let posts_quantity = posts.length
        
        return  (
            <div> 
                <div className="row m-0" >
                    <div className="bg-homepage col-12 col-lg-2 p-3" > 
                        <Sidebar />
                    </div>
                    <div className="col-12 col-lg-10 mx-auto">

                        <h4 className='border-bottom pb-3 mt-5 mb-5 ms-3 '>BIENVENUE CHEZ GROUPOMANIA</h4>

                        <div className="row bg_counter d-lg-flex mb-5 p-3 justify-content-evenly">
                            <div className="counter_container mt-5 mb-5 bg-dark shadow rounded-circle d-flex flex-column justify-content-center align-items-center">
                                <CountUp className="counter_user rounded-circle text-white fw-bold" end={users_quantity} />
                                <div className="text-white fw-bold">utilisateurs</div>
                            </div>
                            <div className="counter_container mt-5 mb-5 bg-dark shadow rounded-circle d-flex flex-column justify-content-center align-items-center">
                                <CountUp className="counter_user rounded-circle text-white fw-bold" end={posts_quantity} />
                                <div className="text-white fw-bold">posts</div>
                            </div>
                        </div>

                        <div className="row d-lg-flex mt-5 pt-5 justify-content-evenly">

                            <div className="col-10 col-lg-4 icon_card mb-5 bg-white shadow rounded">
                                <div className="icon"><i className="text-white rounded bi bi-person-plus-fill"></i></div>
                                <div className="mb-4 mt-2 border-bottom text-end fw-bold">Nouveaux inscrits</div>
                                {newUsers.map(user => (
                                    <div key={user.id} className='member-info2 mb-3 text-end'>
                                        { user.image === null ?
                                        <img className='rounded-circle me-2' height="30"  src={avatar} alt="avatar"/> 
                                        : <img className='rounded-circle me-2' height="30" width="30" src={user.image} alt="avatar"/>
                	                    }
                                        {user.name}
                                        <div className='text-muted'>{user.job}</div>
                                        <div className='text-muted fst-italic'>inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="col-10 col-lg-4 icon_card bg-white mb-5 shadow rounded">
                            <div className="icon"><i className="text-white rounded bi bi-newspaper"></i></div>
                                <div className="mb-4 mt-2 border-bottom text-end fw-bold">Activité récente</div>
                                {newPosts.map(post => (
                                <div key={post.id}>
                                    <div className='member-info2 mb-3 text-end'>
                                        { post.User.image === null ?
                                        <img className='rounded-circle me-3' height="30"  src={avatar} alt="avatar"/> 
                                        : <img className='rounded-circle me-3' height="30" width="30" src={post.User.image} alt="avatar"/>
                	                    }
                                        {post.User.name}
                                        <div className='text-muted'>a publié le {new Date(post.createdAt).toLocaleDateString('fr-FR')}</div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default Dashboard;
