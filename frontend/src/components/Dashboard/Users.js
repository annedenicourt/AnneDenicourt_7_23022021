import Sidebar from './Sidebar';
import { Component } from 'react';
import axios from 'axios';
import MemberItem3 from './MemberItem3';
import logo from '../../assets/groupomania_logo.png'

class Users extends Component {

    state = {
        users: [],
    }

    componentDidMount() {
        this.getAllUsers();
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

    render() {
        let { users } = this.state;
        return  (
            <div> 
                <div className="row m-0">
                    <div className="bg-homepage col-12 col-lg-2 p-3"> 
                        <Sidebar />
                    </div> 

                    <div className="col-12 col-lg-10 p-0">
                    <h4 className='fw-bold text-center rounded pb-1 mt-3 mb-2'><img src={logo} height='80' alt=""/>USERS<img src={logo} height='80' alt=""/></h4>
                        <div className='scroll4 p-2 ms-2'>
                            {users.map(({ name, id, job, image, email, role }) => (
                                <div key={id}>
                                    <MemberItem3
                                        name={name}
                                        member_id={id}
                                        job={job}
                                        image={image}
                                        email={email}
                                        role= {role}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Users;
