import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/caffes', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM caffes").all()
  return c.json(results)
})

app.post('/api/caffes', async (c) => {
  const newId = crypto.randomUUID()
  const input = await c.req.json<any>()
  const query = `INSERT INTO caffes(id,name,description,time) values ("${newId}","${input.name}","${input.description}",${input.time})`
  const newCaffe = await c.env.DB.exec(query)
  return c.json(newCaffe)
})

app.get('/api/caffes/:id', async (c) => {
  const caffeId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM caffes WHERE id = ?').bind(caffeId).all()
  return c.json(results[0])
})

app.put('/api/caffes/:id', async (c) => {
  const caffeId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE caffes SET name = "${input.name}", description = "${input.description}", time = ${input.time} WHERE id = "${caffeId}"`
  const caffe = await c.env.DB.exec(query)

  return c.json(caffe)
})

app.delete('/api/caffes/:id', async (c) => {
  const caffeId = c.req.param('id')

  const query = `DELETE FROM caffes WHERE id = "${caffeId}"`
  const caffe = await c.env.DB.exec(query)

  return c.json(caffe)
})

export default app