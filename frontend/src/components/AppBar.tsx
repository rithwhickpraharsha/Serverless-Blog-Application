import { useNavigate } from "react-router-dom";
import { Avator } from "./Blog_body";



export default function AppBar(){
    const navigate = useNavigate();
    return(
        <div className="border border-slate-500 h-16 flex justify-between mb-10">
           <div className="flex justify-center items-center font-bold ml-10 text-xl">
               Medium
           </div>
           <div className="mr-10">
            <button className="bg-green-500 rounded-lg p-2 hover:bg-green-800 m-2 " onClick={()=>{navigate("/blog/publish");}}>Publish</button>
            <button className="bg-green-500 rounded-lg p-2 hover:bg-green-800 m-2 " onClick={()=>{navigate("/blog/yours")}}>Update</button>
            <Avator name={"me"} />
            
           </div>
        </div>
    )
}