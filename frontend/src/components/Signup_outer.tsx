import { signup_user } from "@rithwhickpraharsha/medium-common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Signup_outer(){
   
  const [Email,setEmail]  = useState('');
    const [pass,setPass]  = useState('');
    const [username,setUsername] = useState('');
    const navigate = useNavigate();
    async function Send(){
        try{
        const info:signup_user = {Email:Email,Username:username,Password:pass};
        console.log(info);
        const res = await axios.post('https://backend.rithwhickpraharshags.workers.dev/api/v1/signup',info);
        toast.success("Sign up successfull");
        setTimeout(()=>{navigate("/blog");},3000);
        }
        catch(err:any){
       
            toast.error(err.response.data.error);
        }
    }


    return(
        <div>
          <ToastContainer />
          <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="text-4xl font-bold m-3">Create an Account</div>
             <div className="mb-3 text-xm font-semibold">Already had an account ? <Link to={"/signin"} className="hover:underline hover:font-bold">Login</Link></div>

             <div className="flex flex-col justify-center items-start">
              <div className=" font-bold text-xl my-3">Username</div>
              <input placeholder="    Enter Your Username" className="border border-black h-10 w-72 rounded-lg overflow-auto"  onChange={(e)=>setUsername(e.target.value)} />
              <div className=" font-bold text-xl my-3">Email</div>
              <input placeholder="    Enter Your Email" className="border border-black h-10 w-72 rounded-lg overflow-auto" onChange={(e)=>setEmail(e.target.value)} />
              <div className=" font-bold text-xl my-3">Password</div>
              <input type = "password" placeholder="    Enter Your Password" className="border border-black h-10 w-72 rounded-lg overflow-auto" onChange={(e)=>setPass(e.target.value)} />
             </div>
             <div className="w-2/4">
              <button className="text-xl p-2 m-3 mt-6 bg-black text-white rounded-xl w-full" onClick={()=>Send()}>Submit</button>
             </div>
          </div>

        </div>
    )
}