import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/events', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM events").all()
  return c.json(results)
})

  app.post('/api/events', async (c) => {
    const newId = crypto.randomUUID()
    const input = await c.req.json<any>()
    const query = `INSERT INTO events(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`
    const newEvent = await c.env.DB.exec(query)
    return c.json(newEvent)
})

export default app