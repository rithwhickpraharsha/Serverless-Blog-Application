
import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import Update_Blog from "./UpdateBlog";




export default function Update(){
    const [blog, setBlog] = useState({title: "",content:"",user:{username:""},tags:[{id:"",name:""}]});
    let tag="";
    const {id} = useParams();
    const blog_id= id;
    const [load,setLoad] = useState(true);
   
    useEffect(()=>{
        async function get_blog(blog_id : any){
            try{
          const res = await axios.get(`https://backend.rithwhickpraharshags.workers.dev/api/v1/blog/${blog_id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('Medium-Blog-Application')}`}});
        
          setBlog(res.data.success);
          for(let i = 0; i < blog.tags.length;i++){
            tag = tag+blog.tags[i].name + ",";

          }
          tag = tag.slice(0,tag.length-1);
          setLoad(false);   
            }catch(err){
                console.log(err);
                console.log("axios get blog error");
            }
        }
        try{
        
        get_blog(blog_id);
       
        
        }catch(err){
            console.log("use params error")
        }

    },[blog_id]);

 console.log(tag);
    return(
        <div>
            {(load)?<div>Loading ... </div> : <Update_Blog title_initial={blog.title} content_initial={blog.content} tag_initial={tag} blog_id={blog_id}/>}
        </div>
    )
}