import '../../styles/Dashboard.css';
import { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import avatar from '../../assets/avatar2.png'
import axios from 'axios';

class MemberItem3 extends Component {

    updateModerator = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        axios.put('http://localhost:3000/api/users/user/'+this.props.member_id+'/role', {
            role: 'Moderator',  
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }
    cancelModerator = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        axios.put('http://localhost:3000/api/users/user/'+this.props.member_id+'/role', {
            role: 'SuperUser',  
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    deleteUser = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        axios.delete('http://localhost:3000/api/users/user/'+this.props.member_id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
                //window.location.reload()
            })
            .catch(err => {
                console.log(err);
                window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
            })
    }

    render() {
        return  (
            <div className="d-flex">
                <Card className="mb-3 mt-5 w-75 mx-auto" >
                    <div className="header_card rounded me-4 ms-4 p-3 text-white fw-bold">User ID {this.props.member_id}</div>                   
                    <Card.Body>
                        <Card.Title className='d-flex justify-content-between'>
                            <Card.Text>{ this.props.image === null ?
                            <img className='rounded-circle me-2' height="40"  src={avatar} alt="avatar"/> 
                            : <img className='rounded-circle me-2' height="40" width="40" src={this.props.image} alt="avatar"/>
                	        }
                            {this.props.name}
                            </Card.Text>
                            <Card.Text>
                                <Button onClick={this.deleteUser} className="button_card me-1">Supprimer le compte</Button>
                            </Card.Text>
                        </Card.Title>
                        <Card.Text className='text-muted border-bottom d-flex'>Poste occupé</Card.Text>
                        <Card.Text className=''>{this.props.job}</Card.Text>
                        <Card.Text className='text-muted border-bottom d-flex'>Adresse email</Card.Text>
                        <Card.Text className=''>{this.props.email}</Card.Text>
                        <Card.Text className='text-muted border-bottom d-flex'>Rôle</Card.Text>
                        <Card.Text className='d-flex justify-content-between'>
                        {this.props.role}
                        { this.props.role === 'SuperUser' ?
                                <Button onClick={this.updateModerator} className="button_card me-1" ><i className="bi bi-check-circle me-2"></i>Choisir comme modérateur</Button>
                                : <Button onClick={this.cancelModerator} className="button_card me-1"><i className="bi bi-x-circle me-2"></i>Retirer comme modérateur</Button>
                	            }
                        </Card.Text>                        
                    </Card.Body>
                </Card>
            </div>  
        )
    }
}
export default MemberItem3;
