import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {decode,sign,verify} from "hono/jwt";
import { SignatureKey } from 'hono/utils/jwt/jws';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    secretKey : SignatureKey
  }
}>()

app.use('/api/*', cors())
app.route('/api/v1/user/',userRouter);
app.route('/api/v1/blog/',postRouter);


// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

export default app
