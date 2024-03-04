import axios from "axios";
import { useEffect, useState } from "react";
import Blog_body from "./Blog_body";
import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";

export default function All_Blogs(){
   const [blogs,setBlogs] = useState([]);
   const [load,setLoad] = useState(true);
   const navigate = useNavigate();
    useEffect(()=>{
        async function fecth_blogs(){
            const res = await axios.get('https://backend.rithwhickpraharshags.workers.dev/api/v1/blogs',{headers:{Authorization : `Bearer ${localStorage.getItem('Medium-Blog-Application')}`}});
          console.log(res.data.Blogs);
            setBlogs(res.data.Blogs);
            setLoad(false);
            

        }
        fecth_blogs();
    },[]);
    return(
        <div>
        <AppBar/>
        <div className="text-2xl font-semibold  ml-16">
            Articles for You
        </div>
        <div className="border border-slate-300 border-bottom-0 ml-16">
    
        </div>
        {(load) ? <div className="text-4xl">Loading ... </div> :
        <div>
            {
                blogs.map((blog:any)=>{
                    return(
                        <div className="hover: cursor-pointer hover:shadow-md ml-10 mb-10" onClick={()=>{navigate(`/blog/${blog.id}`)}}>{
                            <Blog_body title={blog.title} author = {blog.user.username} content = {blog.content} tags = {blog.tags} publishDate={"12-13-2022"}/>}
                        </div>
                    )
                })
            }
        </div>
}
     </div>
    
    )

}