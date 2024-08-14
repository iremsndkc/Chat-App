import { addDoc, collection,  onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { db , auth} from "../firebase";
import { useEffect, useState, useRef } from "react";
import Message from "../components/Message";
import EmojiPicker from "emoji-picker-react";

addDoc
const ChatPage = ({room, setRoom}) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const lastmsg = useRef(null);
    
  // form gönderilince mesajı veritabanına kaydet.
    const handleSubmit = async (e) => {
        e.preventDefault();
        //mesaj documentinin kaydedileceği koleksiyonun referansını al
        const messagesCol = collection(db,"messages");
        // referansı alınan kolaeksiyonu documenti ekle.
        await addDoc(messagesCol, {
            text: e.target[0].value,
            room,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
            },
            createdAt: serverTimestamp()
        });
        //formu temizle
        setText("");
    };

  //mevcut odada gönderilen mesajları anlık olarak al.
  useEffect(() => {
    // 1)abone olunacak kolesiksoyunun referansını al.
    const messagesCol = collection(db, "messages");
    //2) sorgu ayarlarını yap.
    const q = query(messagesCol, where("room", "==", room),
    orderBy("createdAt", "asc"));
    //3) onSnapshot anlık olarak koleskiyondaki eğişimleri izler.
    // her değiştiğinde callback fn tetşklenir ve  güncellemeleri alır.
    const unsub = onSnapshot(q,(snapshot) => {
      let temp = [];
      // 4)data methodu ile dökümanların içerisindeki veriye erişip geçici diziye aktardık.
      snapshot.docs.forEach((doc) => {
        temp.push(doc.data());
      });
      //son mesaja odakla
      lastmsg.current.scrollIntoView({behavior: "smooth"});
      setMessages(temp);
    });
    // kullanıcı sayfadan ayrıldığı anda dinlemeyi durdur.
    return () => {
      unsub();
    };
  }, []);
  
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.length < 1 ? <p className="warn">Sohbete İlk Mesajı Gönderin</p>
        :messages.map((data, key) => <Message data={data} key={key} />)
        }
        <div ref={lastmsg}></div>
      </main>



      <form className="send-form" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="mesajınızı yazınız"
          type="text"
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji);
              setIsOpen(false);
            }}
            open={isOpen}
            skinTonesDisabled
          />
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            😉
          </button>
        </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage
