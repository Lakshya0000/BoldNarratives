import { Hono } from "hono";
import authmiddleware from "../middleware";
export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string
        
    },
    Variables: {
        userId: string;
    }
}>()

blogRouter.use('*', authmiddleware)

blogRouter.get('/protected',  (c) => {
    return c.json({
        message: 'This is a protected route',
        userId:  c.get("userId")
        
    })
})

