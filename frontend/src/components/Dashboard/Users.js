import Sidebar from './Sidebar';
import { Component } from 'react';
import axios from 'axios';
import MemberItem3 from './MemberItem3';

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
                    <h4 className='border-bottom pb-3 mt-5 mb-2 ms-3 '>USERS GROUPOMANIA</h4>
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
