import '../styles/NewPost.css';
import avatar from '../assets/avatar2.png';
import { useForm } from "react-hook-form";
import PostDataService from "../services/post.service";


function onSubmit (data) {
    PostDataService.create(data)
    .then(response => {
        let newPost = document.getElementById('textarea').value;
        console.log(newPost)
    })
    .catch(
        error=>console.log(error))
}

function NewPost() {

    const { register, handleSubmit, watch, errors } = useForm();

    return (
    <div className="border mb-3">
        <div className="new-postbox d-flex p-3">
			<figure>
            <img className='me-3' src={avatar} height='50' alt=""/>
			</figure>
            <textarea rows='5' className="p-3" placeholder="Ecrivez quelquechose..." id="textarea" name='textarea'></textarea>
            <label htmlFor="textarea"></label>
            <div className="attachments">
                <i className="bi bi-image me-2"></i>
                <button type="submit" onClick={handleSubmit(onSubmit)}>Publier</button>
            </div>
		</div>
    </div>
    )
}

export default NewPost


            
            