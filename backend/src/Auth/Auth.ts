import { verify } from "hono/jwt";
import { Hono } from "hono";

export default async function MiddleWare(c:any,next:any){

 try{
console.log("Authentication Started");
 const secret = c.env.JWT_SECRET;
 const head = await c.req.header('Authorization');

 const token = head.split(' ')[1];
 const check = await verify(token,secret);

 const UserId = check.userId;
 c.set('id',UserId);


 console.log('Authentication Success');
 await next();
 }
 catch(err){
    console.log(err);

  return c.json({"error" : "Authentication Error"});

 }


    

}