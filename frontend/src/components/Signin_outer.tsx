import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signin_user} from '@rithwhickpraharsha/medium-common';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Signin_outer(){
    const [Email,setEmail]  = useState('');
    const [pass,setPass]  = useState(' ');
    const navigate = useNavigate();
    async function Send(){
        try{
        const info:signin_user = {Email:Email,Password:pass};
        const res = await axios.post('https://backend.rithwhickpraharshags.workers.dev/api/v1/signin',info);
        const token = res.data.success;
        localStorage.setItem('Medium-Blog-Application',token);
        toast.success("Sign in successfull");
        setTimeout(()=>{navigate("/blog");},3000);
        }
        catch(err:any){
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
        }
    }

    return(
        <div>
           
          <div className="flex flex-col justify-center items-center h-screen w-full">
            <ToastContainer position="top-right"/>
            <div className="text-4xl font-bold m-3">Login</div>
             <div className="mb-3 text-xm font-semibold">Doesn't have an account ? <Link to={"/signup"} className="hover:underline hover:font-bold">Signup</Link></div>

             <div className="flex flex-col justify-center items-start">
              <div className=" font-bold text-xl my-3">Email</div>
              <input placeholder="    Enter Your Email" className="border border-black h-10 w-72 rounded-lg overflow-auto" onChange={(e)=>{setEmail(e.target.value)}} />
              <div className=" font-bold text-xl my-3">Password</div>
              <input type ="password" placeholder="    Enter Your Password" className="border border-black h-10 w-72 rounded-lg overflow-auto"  onChange={(e)=>{setPass(e.target.value)}} />
             </div>
             <div className="w-2/4">
              <button className="text-xl p-2 m-3 mt-6 bg-black text-white rounded-xl w-full" onClick={()=>{Send()}}>Submit</button>
             </div>
          </div>

        </div>
    )
}