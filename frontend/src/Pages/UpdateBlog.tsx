import { useNavigate } from "react-router-dom";
import Update from "../components/Update";
import { useEffect } from "react";



export default function UpdateBlog(){
    const navigate  = useNavigate();
    useEffect(()=>{

        const item = localStorage.getItem('Medium-Blog-Application');
        if(!item){
          navigate('/signin');
        }
    },[])

    return(
        <div>
            <Update />
        </div>
    )
}