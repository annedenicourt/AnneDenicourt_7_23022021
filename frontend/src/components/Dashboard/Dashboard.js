import '../../styles/Dashboard.css';
import { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import CountUp from 'react-countup';



class Dashboard extends Component {
    state = {
        users: [],
        posts: [],
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllPosts();
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
    render() {
        let { users, posts } = this.state
        let users_quantity = users.length
        let posts_quantity = posts.length

        return  (
            <div> 
                <div className="row m-0" >
                    <div className="bg-homepage col-12 col-lg-2 p-3" > 
                        <Sidebar />
                    </div>
                    <div className="col-12 col-lg-10">
                        <h4 className='border-bottom pb-3 mt-5 mb-5 ms-3 '>BIENVENUE CHEZ GROUPOMANIA</h4>
                        <div className="d-flex justify-content-evenly">
                            <div className="counter_container me-5 bg-dark rounded-circle d-flex justify-content-center align-items-center">
                                <CountUp className="counter_user rounded-circle text-white fw-bold" end={users_quantity} />
                            </div>
                            <div className="counter_container bg-dark rounded-circle d-flex justify-content-center align-items-center">
                                <CountUp className="counter_user rounded-circle text-white fw-bold" end={posts_quantity} />
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
export default Dashboard;
