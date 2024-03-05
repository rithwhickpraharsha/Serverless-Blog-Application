
import Signin_outer from '../components/Signin_outer';
import Quote from '../components/Quote';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Signin(){
    const navigate  = useNavigate();
    useEffect(()=>{
        const item = localStorage.getItem('Medium-Blog-Application');
        if(item){
          navigate('/');
        }
    },[])
  




return(
    <div>
    <div className='grid grid-cols-1 lg:grid-cols-2'>
    <div className='cols-span-1'><Signin_outer /></div>
    <div className='cols-span-1'> <Quote /></div>
    </div>
</div>
)


}