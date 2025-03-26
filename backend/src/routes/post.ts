import { Hono } from "hono";
import { decode,verify,sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput} from "@ritesh160193/medium-common5";
export const postRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        secretKey: string;
    },
    Variables:{
      userId: string;
    }
}>();


//Middleware
postRouter.use('/*',async(c,next)=>{
    //get the header
    //verify header
    //If header is correct proceed.
    const header=c.req.header("authorization")||"";
    
    try{
      //If getting token in 'Bearer token' format.
      //token: ["Bearer","token"]
      const token=header;// If using Bearer then we will do token=header.split(" ")[1]
      const response=await verify(token,c.env.secretKey);
      if(!response)
      {
        c.status(403);
        return c.json({
          msg:"unauthorised"
        })
      }
      c.set("userId",response.id as string);
      await next();    

    }
    catch(e)
    {
      c.status(403);
        return c.json({
          msg:"unauthorised"
        })
    }
  })
  // console.log("hi")
  //Post a blog
  postRouter.post('/',async(c)=>{

    const prisma=new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    

    const body = await c.req.json();
    const {success}=createBlogInput.safeParse(body);
    if(!success)
    {
      c.status(403)
      return c.json({
          msg:"Wrong blog post"
      })
    }
    const authorId=c.get("userId");
    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
    })
    
    return c.json({id:blog.id});
  })

  postRouter.put('/',async(c)=>{
    const prisma=new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success)
    {
      c.status(403)
      return c.json({
          msg:"Wrong blog update"
      })
    }
    const blog = await prisma.post.update({
      where:{
        id:body.id
      },
        data:{
            title:body.title,
            content:body.content,
        }
    })
  return c.json({id:blog.id});
})

//should add pagination to this end point
postRouter.get('/bulk',async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const blog = await prisma.post.findMany({
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true
        }
      }

    }
  });
  if(blog)
  return c.json({blog});
  else
  {
    c.status(403);
    return c.json({
      msg:"Error returning blogpost"
    })

  }
})

postRouter.get('/:id',async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const id = c.req.param("id");
  try{
    const blog = await prisma.post.findFirst({
      where:{
        id:id
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    return c.json({blog});
  }
  catch(e)
  {
    c.status(411);
    c.json("Error thrown");
  }
})

