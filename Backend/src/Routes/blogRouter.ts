import { Hono } from "hono";
import authmiddleware from "../middleware";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string
        
    },
    Variables: {
        userId: Number;
    }
}>()

blogRouter.use('*', authmiddleware)

blogRouter.get('/protected',  (c) => {
    return c.json({
        message: 'This is a protected route',
        userId:  c.get("userId")
        
    })
})

blogRouter.get('/all', async (c) =>  {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select : {
            id : true,
            title : true,
            views : true,
            author : {
                select : {
                    name : true
                }
            },
            _count : {
                select : {
                    comments : true,
                    votes : true
                }
            }
        }
    })
 
    return c.json({blogs})
})

blogRouter.get('/search', async (c)=>{
    try {
        const search = c.req.query("search")
        if(!search){
            c.status(400)
            return c.json({
                message : "Enter search query"
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const blogs = await prisma.blog.findMany({
            where : {
                title : {
                    contains : search
                }
            },
            take : 4,
            select : {
                id : true,
                title : true
            }
        })
        return c.json({blogs})
    } catch (error) {
        console.log(error)
    }
})
blogRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const blog = await prisma.blog.findUnique({
        where : {
            id : parseInt(c.req.param("id"))
        },
        select : {
            id : true,
            title : true,
            content : true,
            views : true,
            vote : true,
            authorId : true,
            author : {
                select : {
                    name : true
                }
            }
        }
    })
    if(!blog){
        c.status(404)
        return c.json({
            message : "Blog not found"
        })
    }
    return c.json({blog})
})

const blogBody = z.object({
    title : z.string(),
    content : z.string(),
    genre : z.string(),
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = blogBody.safeParse(body)
    if (!success) {
        c.status(401);
        return c.json({
            message: "Enter valid title and content"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{const blog = await prisma.blog.create({
        data : {...body, authorId : c.get("userId")}
    })
    return c.json({blog})}
    catch(e){
        c.status(500);
        console.log(e);
        return c.text("error occcurred")
    }
})
blogRouter.put('/update', async (c) => {
    try{
        const body = await c.req.json();
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const blog = await prisma.blog.update({
            where : {
                id : body.id
            },
            data : {
                vote : body.vote,
                views : body.views
            }
        })
        return c.json({blog})
    }
    catch(e){
        c.status(500);
        console.log(e);
        return c.text("error occcurred")
    }    
})
