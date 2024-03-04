import { useNavigate } from "react-router-dom";
import Publish_Blog from "../components/Publish";
import { useEffect } from "react";




export default function Publish(){
    const navigate  = useNavigate();
    useEffect(()=>{
        const item = localStorage.getItem('Medium-Blog-Application');
        if(!item){
          navigate('/signin');
        }
    },[])
    return(
        <div>
                        <Publish_Blog title_initial={""} content_initial={""} tag_initial={""} />

        </div>
    )
}