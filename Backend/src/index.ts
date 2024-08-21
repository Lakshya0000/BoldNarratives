import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>()



app.post('/', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
return c.text("hello l")
})

export default app
