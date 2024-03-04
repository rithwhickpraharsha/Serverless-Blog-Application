import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avator } from "../components/Blog_body";
import AppBar from "../components/AppBar";


export default function Blog(){
    const [blog, setBlog] = useState({title: "",content:"",user:{username:""},tags:[]});
    const {id} = useParams();
    const blog_id = id;
    const [load,setLoad] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        async function get_blog(blog_id : any){
            try{
          const res = await axios.get(`https://backend.rithwhickpraharshags.workers.dev/api/v1/blog/${blog_id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('Medium-Blog-Application')}`}});
          setBlog(res.data.success);
            }catch(err){
                console.log(err);
                console.log("axios get blog error");
            }
        }
        try{

          const item = localStorage.getItem('Medium-Blog-Application');
          if(!item){
            navigate('/signin');
          }
        
        get_blog(blog_id);
        setLoad(false);
        
        }catch(err){
            console.log("use params error")
        }

    },[blog_id]);
 
   
   return (
    <div>
      <AppBar />
      {(load)?<div className="text-4xl"> Loading ... </div>:<div className="flex flex-col items-center">
        <div className="w-1/2">
          <div className="flex flex-wrap font-bold text-2xl mb-4 lg:text-3xl max-w-1/2 lg:w-full overflow-auto">
            {blog.title}
          </div>
  
          <div className="flex justify-start items-center w-full">
            <Avator name={blog.user.username} />
            <div className="ml-3">{blog.user.username}</div>
          </div>
          <div className="flex justify-start w-full mt-10 mb-5">
            {blog.content}
          </div>  
        </div>
      </div>
}
    </div>
  );
  
}