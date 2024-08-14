import { signInWithPopup } from 'firebase/auth';
import { auth , provider} from "../firebase/index";

const LoginPage = ({setIsAuth}) => {
    //butona tılanınca çalışır
    const handleClick = () => {
        signInWithPopup(auth, provider)
        .then((data) => {
            // state'i güncelle
            setIsAuth(data.user.refreshToken);
            // localstorageyi güncelle
            localStorage.setItem("token", data.user.refreshToken);
        })
        .catch((err) => console.log(err));
    };
  return (
    <div className='container'>
      <div className='login'>
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
            <img src="g-logo.png" alt="google" />
            <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  )
}

export default LoginPage
