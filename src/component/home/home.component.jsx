
import './home.style.css';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";


const Home=()=>{

   const inputRef=useRef(null)
    const navigate=useNavigate();


    const handleSubmit=async (e)=>{
         e.preventDefault();   
        localStorage.setItem('username',inputRef.current.value);
        navigate('/todoList');
    }     
    
    return(
        <div className="home-page">
            <form onSubmit={handleSubmit} >
            <label >Kullanıcı Adı giriniz</label>
            <input ref={inputRef} type="text" required  />
            <button  type='submit'  > Giriş</button>
            </form>
        </div>
    );
};


export default Home;