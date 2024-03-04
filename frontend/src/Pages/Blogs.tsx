import { useEffect } from "react";
import All_Blogs from "../components/Blogs";
import { useNavigate } from "react-router-dom";




export default function Blogs(){
    const navigate  = useNavigate();
    useEffect(()=>{
        const item = localStorage.getItem('Medium-Blog-Application');
        if(!item){
          navigate('/signin');
        }
    },[])
    return(
        <div>
            <All_Blogs />
        </div>
    )
}