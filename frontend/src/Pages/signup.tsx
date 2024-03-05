import { useNavigate } from 'react-router-dom';
import Quote from '../components/Quote';
import Signup_outer from "../components/Signup_outer"
import { useEffect } from 'react';


export default function Signup(){
    const navigate  = useNavigate();
    useEffect(()=>{
        const item = localStorage.getItem('Medium-Blog-Application');
        if(item){
          navigate('/');
        }
    },[])

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div className='cols-span-1'><Signup_outer /></div>
            <div className='cols-span-1'> <Quote /></div>
            </div>
        </div>
    )
}