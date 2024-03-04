

export async function hashPassword(password:string): Promise<string>{

return password

}

export async function comparePassword(password : string ,hashed_password : string) : Promise<Boolean>{
if(password == hashed_password){
    return true;
}
return false;
}