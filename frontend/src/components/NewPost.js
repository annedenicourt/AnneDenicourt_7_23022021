import '../styles/NewPost.css'
import avatar from '../assets/avatar2.png'

function NewPost() {

    return (
    <div className="border mb-3">
        <div className="new-postbox d-flex p-3">
			<figure>
            <img className='me-3' src={avatar} height='50' alt=""/>
			</figure>
            <textarea rows='5' className="p-3" placeholder="Ecrivez quelquechose..." id="textarea"></textarea>
            <label htmlFor="textarea"></label>
		</div>
        <div className="attachments">
            <i className="bi bi-image me-2"></i>
            <i className="bi bi-camera-video-fill me-2"></i>
            <i className="bi bi-camera-fill me-2"></i>
            <button type="submit">Publier</button>
        </div>
    </div>
    )
}

export default NewPost


            
            