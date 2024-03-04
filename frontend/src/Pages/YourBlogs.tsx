import axios from "axios";
import { useEffect, useState } from "react";

import Blog_body from "../components/Blog_body";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";



export default function YourBlog(){
    const [blogs,setBlogs] = useState([{id:"",title:"",content:"",user:{username:""},tags:[]}]);
    const [load,setLoad] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
      async function Get_my_blogs(){
        try{
        const res = await axios.get('https://backend.rithwhickpraharshags.workers.dev/api/v1/blog',{headers:{Authorization:`Bearer ${localStorage.getItem('Medium-Blog-Application')}`}});
        console.log(res.data.success);
        setBlogs(res.data.success);
        setLoad(false);
        }
        catch(err){
          console.log("Fetch my blogs");
          console.log(err);
        }

      }
    
        const item = localStorage.getItem('Medium-Blog-Application');
        if(!item){
          navigate('/signin');
        }
   
      Get_my_blogs();
    },[]);

    return(
      <div>
        <AppBar/>
        <div>
           {
            (load)? <div>Loading ... </div> :blogs.map((blog)=>{
             return( 
             <div className="hover: cursor-pointer hover:shadow-md ml-10 mb-10" onClick={()=>{navigate(`/blog/update/${blog.id}`)}}>
 <Blog_body title={blog.title} content = {blog.content} author={blog.user.username}  tags = {blog.tags} publishDate={"04-03-2024"} />
         </div>
            )})
           }
        </div>
        </div>
    )
}