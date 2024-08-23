import { Hono } from "hono";
import { z } from "zod";
import {  sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
type Bindings = {
    DATABASE_URL: string
    JWT_SECRET: string
}
export const userRouter = new Hono<{ Bindings: Bindings }>()

const signupBody = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string()
})

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupBody.safeParse(body)
    if (!success) {
        c.status(400);
        return c.json({
            message: "Enter valid email"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())

    try {
        const userExists = await prisma.user.findFirst({
            where: {
                email: body.email,

            }
        })

        if (userExists) {
            c.status(409);
            return c.json({
                message: "User already exists"
            });
        }
    } catch (e) {
        console.log(e);
        return c.text("Error")
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            }


        })
        const payload = {
            email: user.email,
            password: user.password,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        }
        // Add this before the sign function to verify
        const jwtToken = await sign(payload, c.env.JWT_SECRET);
        return c.json({token:jwtToken});
    }
    catch (e) {
        c.status(500);
        console.log(e);
        return c.text("error occcurred")
    }
})

const signinBody = z.object({
    email: z.string().email(),
    password: z.string()
})
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinBody.safeParse(body)
    if (!success) {
        c.status(401);
        return c.json({
            message: "Enter valid email"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const userExists = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (userExists) {
            const payload = {
                email: userExists.email,
                password: userExists.password,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
            }
            const jwtToken = await sign(payload, c.env.JWT_SECRET);

            c.status(200);
            return c.json({
                jwtToken,
                message: "user logged in successfully"
            });
        }
        else {
            c.text("error occurred")
        }
    } catch (e) {
        console.log(e);
        c.status(500)
        return c.text("Error")
    }
})