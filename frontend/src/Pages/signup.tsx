import {signup_user} from '@rithwhickpraharsha/medium-common';
import Quote from '../components/Quote';
import Signup_outer from "../components/Signup_outer"


export default function Signup(){
    

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div className='cols-span-1'><Signup_outer /></div>
            <div className='cols-span-1'> <Quote /></div>
            </div>
        </div>
    )
}