import { Hono } from "hono";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string
        
    }
}>()