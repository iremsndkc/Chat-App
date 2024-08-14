import { auth } from "../firebase"

const Message = ({data}) => {
    // eğer mesajı bu cihazda oturumu açık olan kullanıcı attıysa sağ tarafta
    if(auth.currentUser.uid === data.author.id) {
        return <p className="msg-user">{data.text}</p>
    }
    //eğer mesajı farklı bir kullanıcı attıysa sol tarafta olacak.
  return (
    <div className="msg-other">
        <div>
            <img src={data.author.photo} alt="profile-picture" />
            <span>{data.author.name}</span>
        </div>
        <p className="msg-text">{data.text}</p>
    </div>
  )
}

export default Message
