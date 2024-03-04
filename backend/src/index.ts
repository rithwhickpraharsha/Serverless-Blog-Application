import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { hashPassword,comparePassword } from './validation&hashing/bcrypt'
import {signin_user,signup_user,update_blog,valid_blog} from '@rithwhickpraharsha/medium-common';
import MiddleWare from './Auth/Auth'
import { decode, sign, verify} from 'hono/jwt'
import { cors } from 'hono/cors';
const router = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET : string,
  },
  Variables : {
    id : string,
  }
}>();
router.use('/api/*',cors());


router.post('/api/v1/signin',async(c)=>{

const prisma = new PrismaClient({
  datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate());

const body = await c.req.json();
const check = signin_user.safeParse({Email : body.Email,Password : body.Password});
if(!check.success){
   c.status(403);
   return c.json({"error" : "Sign in Validation Failed"});
}
const signed_user = await prisma.user.findUnique({
  where:{
    Email: body.Email
  },
  select:{
    Password:true,
    id:true
  }
});

const pass = body.Password;
if(signed_user){
  const result = await comparePassword(pass,signed_user.Password);
  if(result){
    const token = await sign({userId : signed_user.id},c.env.JWT_SECRET);
    c.status(200);
    return c.json({"success" : token});
  }
  else{
    c.status(403);
    return c.json({"error" : "Incorrect Password"});
  }
}


else{

  c.status(403);
  return c.json({"error" : "User doesnt Exist... Please signup"});


}
});

router.post('/api/v1/signup',async(c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());


  const body = await c.req.json();
  const check_user = await prisma.user.findUnique({where:{Email:body.Email},select:{Email:true}});
  if(check_user){
    c.status(413);
    return c.json({"error" : "User already Exists..Please Signin"});
  }
  const parsed_user = signup_user.safeParse({Email :  body.Email, Password : body.Password,Username : body.Username});

  if(parsed_user.success){
    const hashed_password = await hashPassword(body.Password);
    const signup_user = await prisma.user.create({
      data:{
        Email:body.Email,
        Password : hashed_password,
        username : body?.Username
      },
      select:{
        Email:true,
        id:true
      }
    });

    console.log(signup_user);
    const token = await sign({userId : signup_user.id},c.env.JWT_SECRET);
    c.status(200);
    return c.json({"success" : token});

  }
  else{
    c.status(413);
    return c.json({"error" : "Validation error"});
  }

});

router.get('/api/v1/user/:id',MiddleWare,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user_id = await c.req.param('id');
  const user_info = await prisma.user.findUnique({where:{id:user_id},select:{username:true,Email:true}});
  c.status(200);
  return c.json({"success" : {username: user_info?.username,Email : user_info?.Email}});
});



router.get('/api/v1/blogs',MiddleWare,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.blog.findMany({
    select:{
      id:true,
      title:true,
      content:true,
      tags:true,
      user:{
        select:{
          username:true
        }
      }
    }
  });
  c.status(200);
  return c.json({"Blogs" : blogs});

});




router.post('/api/v1/blog',MiddleWare,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const id = c.get('id');
  const parsed_blog = valid_blog.safeParse({title: body.title, content:body.content, author : id,tags : body.tags});

  if(parsed_blog.success){

      const response = await prisma.$transaction(async(prisma)=>{

        const tag_ids = [] 
        for(let i = 0; i < body.tags.length; i++){
          const tag_name = body.tags[i];
          const tag_id = await prisma.tag.findUnique({where:{name: tag_name},select:{id:true}});
          if(tag_id){
            tag_ids.push(tag_id.id);
          }
          else{

            const tag_create = await prisma.tag.create({
              data:{
                name : tag_name,
              },
              select:{
                id:true
              }
            });
            tag_ids.push(tag_create.id);
          }
        } 
      
        const blog_create = await prisma.blog.create({
          data:{
           title : body.title,
           content:body.content,
           tags : {
            connect : tag_ids.map((tag_id) => ({id : tag_id}))
           },
           UserId : id
        },
        select:{
          title:true,
          UserId:true,
          tags : true,
        }
      
      });
      console.log(blog_create);
      });
      c.status(200);
      return c.json({"success" : "Blog Creation Successfull"});
  

  }
  else{
    c.status(413);
    return c.json({"error" : " Blog Validation Failed"});
  }

});


router.get('/api/v1/blog',MiddleWare,async(c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const id = c.get('id');



  const response = await prisma.blog.findMany({
  where:{
    UserId:id
  },
  select:{
    title:true,
    content:true,
    tags:true,
    id:true,
    user:{
      select:{
        username:true
      }
    }
  }
  });
  if(!response){
    c.status(413);
    return c.json({"error" : "Invalid Operations"})
  }
  c.status(200);
  return c.json({"success" : response});

});
router.get('/api/v1/blog/:id',MiddleWare,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog_id = await c.req.param('id');

   const blog_ret = await prisma.blog.findUnique({where: {id : blog_id} ,select : {title:true,content:true,tags:true,user:{select:{username:true}}}});
   if(blog_ret){
    c.status(200);
   return c.json({"success" : blog_ret });
   }
   else{
    c.status(403);
    return c.json({"error " : "Blog is no longer there"});
   }




});





router.put('/api/v1/blog/:id',MiddleWare,async(c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const id = c.get('id');
  const blog_id = c.req.param('id');
  const body = await c.req.json();
  const check = update_blog.safeParse({id:id,blog_id:blog_id,title:body.title,content:body.content});
if(!check.success){
   c.status(413);
   return c.json({"error" : "Update Validation Failed"});
}
 
  const response = await prisma.blog.update({
  where:{
    id : blog_id,
    UserId:id
  },
  data:{
    title : body.title,
    content : body.content,
  },
  select:{
    title:true,
    content:true,
  }
  });
  if(!response){
    c.status(413);
    return c.json({"error" : "Invalid Operations"})
  }
  c.status(200);
  return c.json({"success" : "Blog Updated Successfully"});

});
router.get('/api/v1/blog/:id',MiddleWare,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog_id = await c.req.param('id');

   const blog_ret = await prisma.blog.findUnique({where: {id : blog_id} ,select : {title:true,content:true,user:{select:{username:true}}}});
   if(blog_ret){
    c.status(200);
   return c.json({"success" : blog_ret });
   }
   else{
    c.status(403);
    return c.json({"error " : "Blog is no longer there"});
   }




});

router.delete('/api/v1/blog/:id',MiddleWare,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())


  const blog_id = await c.req.param('id');

  const blog_ret = await prisma.blog.delete({where: {id : blog_id}});
  c.status(200);
  return c.json({"success" : "Blog deletion Successfull" });
 

});


export default router
