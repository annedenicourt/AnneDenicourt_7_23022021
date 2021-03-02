import '../styles/NewComment.css'
import avatar from '../assets/avatar2.png'
import { useForm } from "react-hook-form";
import CommentDataService from "../services/comment.service";



function onSubmit (data) {
    CommentDataService.create(data)
    .then(response => {
        let newComment = document.getElementById('textarea2').value;
        console.log(newComment)
    })
    .catch(
        error=>console.log(error))
}


function NewComment() {

    const { register, handleSubmit, watch, errors } = useForm();

    return(
        <div className=" mb-3">
            <div className="new-comment d-flex p-3">
			    <figure>
                    <img className='me-3' src={avatar} height='30' alt=""/>
			    </figure>
                <textarea rows='1' className="p-3" placeholder="Ecrivez un commentaire..." id="textarea2"></textarea>
                <label htmlFor="textarea"></label>
                <div className="emojis">
                    <i className="bi bi-hand-thumbs-up me-1"></i>
                    <i className="bi bi-emoji-smile me-1"></i>
                    <i className="bi bi-emoji-frown me-1"></i>
                    <i className="bi bi-emoji-angry me-1"></i>
                    <i className="bi bi-emoji-laughing"></i>
                    <button className='comment-button' type="submit" onClick={handleSubmit(onSubmit)}><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
		    </div>
        </div>
    )
}

export default NewComment

