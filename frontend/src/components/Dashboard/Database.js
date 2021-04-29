import Sidebar from './Sidebar';
import { Component } from 'react';
import axios from 'axios';
import logo from '../../assets/groupomania_logo.png'

class Database extends Component {

    state = {
        users: [],
        posts: [],
        comments: [],
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllPosts();
        this.getAllCommentsAdmin();
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
    getAllCommentsAdmin() {
        const token = localStorage.getItem("token");

		axios.get('http://localhost:3000/api/comments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({ comments: res.data });
            })
            .catch(err => {
                console.log(err);
                alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    render() {
        let { users, posts, comments } = this.state;
        let users_quantity = users.length;
        let posts_quantity = posts.length;
        let comments_quantity = comments.length;

        return  (
            <div> 
                <div className="row m-0">
                    <div className="bg-homepage col-12 col-lg-2 p-3"> 
                        <Sidebar />
                    </div> 

                    <div className="scroll4 col-12 col-lg-10">
                        <h4 className='fw-bold text-center rounded pb-1 mt-3 mb-2'><img src={logo} height='80' alt=""/>DATABASE<img src={logo} height='80' alt=""/></h4>
                        <div className='membres fw-bold mt-5 mb-2 ms-3 '>TABLE Users</div>
                        <div className='p-2 ms-2'>
                            <table className="table bg-white shadow rounded text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Job</th>
                                        <th scope="col">Rôle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map(({ name, id, job, image, email, role }) => (
                                    <tr key={id}>
                                        <th scope="row">{id}</th>
                                        <td><img className='rounded-circle'src={image} height="30" alt="" /></td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{job}</td>
                                        <td>{role}</td>
                                    </tr>
                                                               
                                ))}
                                </tbody>
                            </table>
                            <div className='fw-bold'><i className="bi bi-arrow-return-right me-3"></i>{users_quantity} utilisateurs sont inscrits</div>
                        </div>
                        <div className='membres fw-bold mt-5 mb-2 ms-3 '>TABLE Posts</div>
                        <div className='p-2 ms-2'>
                            <table className="table bg-white shadow rounded">
                                <thead>
                                    <tr>
                                        <th scope="col">Post Id</th>
                                        <th scope="col">User Id</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Content</th>
                                        <th scope="col">Likes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map(post => (
                                
                                    <tr key={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.UserId}</td>
                                        <td><img className=''src={post.image} height="30" alt="" /></td>
                                        <td>{post.content}</td>
                                        <td>{post.likes}</td>
                                    </tr>                             
                                ))}
                                </tbody>
                            </table>
                            <div className='fw-bold'><i className="bi bi-arrow-return-right me-3"></i>{posts_quantity} posts ont été publiés</div>                        
                        </div> 
                        <div className='membres fw-bold mt-5 mb-2 ms-3 '>TABLE Comments</div>
                        <div className='p-2 ms-2'>
                            <table className="table bg-white shadow rounded">
                                <thead>
                                    <tr>
                                        <th scope="col">Comment Id</th>
                                        <th scope="col">Post Id</th>
                                        <th scope="col">Owner Id</th>
                                        <th scope="col">Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.map(comment => (
                                
                                    <tr key={comment.id}>
                                        <th scope="row">{comment.id}</th>
                                        <td>{comment.PostId}</td>
                                        <td>{comment.OwnerId}</td>
                                        <td>{comment.content}</td>
                                    </tr>                        
                                ))}
                                </tbody> 
                            </table>
                            <div className='fw-bold'><i className="bi bi-arrow-return-right me-3"></i>{comments_quantity} commentaires ont été publiés</div>                        
                        </div>   
                    </div> 
                </div> 
            </div>           
        )
    }
}
export default Database;
