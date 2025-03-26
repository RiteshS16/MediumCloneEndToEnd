import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { SignatureKey } from "hono/utils/jwt/jws";
import {decode,sign,verify} from "hono/jwt"
import {signinInput,signupInput} from "@ritesh160193/medium-common5"


export const userRouter=new Hono<{
  Bindings:{
    DATABASE_URL : string,
    secretKey : string
  }
}>();

userRouter.post('/signup',async(c)=>{

    //Getting body in hono
    const body = await c.req.json();
    //ZOD:
    //body content {email:string, content:string, name: string optional}
    const {success} =signupInput.safeParse(body);
    console.log(success)
    if(!success)
    {
        c.status(403)
        return c.json({
            msg:"Wrong credentials for signup"
        })
    }

    //Always call the PrismaClient inside RESTful API. It will not work independently outside.
    const prisma=new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    
  
    //Inserting the values in the DB
    //Ideally you should hash passwords and then insert in DB
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.name
      }
    })
  
    const token = await sign({id:user.id},c.env.secretKey);
    console.log(token);
    return c.json(token)
  })
  
  
  userRouter.post('/signin',async(c)=>{
    const prisma=new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    //Getting body in hono
    const body = await c.req.json();
    
    const {success}=signinInput.safeParse(body);
    if(!success)
    {
      c.status(403)
      return c.json({
          msg:"Wrong credentials for signin"
      })
    }
    //Inserting the values in the DB
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user)
    {
      c.status(403);
      return c.json({
        error:"User does not exist"
      })
    }
    const token = await sign({id:user.id},c.env.secretKey);
    return c.json(token)
  
  })