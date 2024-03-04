import { useState } from "react";
import AppBar from "./AppBar"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface props_publish{
    title_initial:string,
    content_initial:string,
    tag_initial:string
}
const Publish_Blog = ({title_initial,content_initial,tag_initial}:props_publish)=>{
    console.log(tag_initial);
    const [title,setTitle] = useState(title_initial);
    const [content,setContent] = useState(content_initial);
    const [tags,setTags] = useState(tag_initial);
    const navigate = useNavigate();
    async function publish(){

    try{
        const Tag = tags.split(',');
        const send = {title:title,content:content,author:`${localStorage.getItem('Medium-Blog-Application')}`,tags:Tag};
        const res = await axios.post('https://backend.rithwhickpraharshags.workers.dev/api/v1/blog',send,{headers:{Authorization:`Bearer ${localStorage.getItem('Medium-Blog-Application')}`}});
        toast.success(res.data.success);
        setTimeout(()=>{navigate('/blog')},2000);


    }
    catch(er:any){
        console.log("Publish blog tag split error");
        console.log(er);
        toast.error(er.response.data.error);
    }

    }
    return(
        <div>
            <ToastContainer />
            <AppBar />
        <div className="mt-16 flex flex-col items-center ">
            
            <textarea value={title} placeholder="Title" className="mb-10 h-auto w-full border border-slate-400 flex flex-wrap overflow-wrap break-words " onChange={(e)=>setTitle(e.target.value)} />
            <textarea value={content} placeholder="Content" className="mb-10 w-full h-72 border border-slate-400" onChange={(e)=>setContent(e.target.value)}/>
            <textarea value={tags} placeholder="Enter Tags separated by comas" className="mb-10 w-full border border-slate-400"onChange={(e)=>setTags(e.target.value)} />
            <button className="bg-green-700 p-2 rounded-md" onClick={()=>publish()}>Publish</button>
        </div>
        </div>
    )
}
export default Publish_Blog