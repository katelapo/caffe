interface Env {
    ASSETS: Fetcher;
    DB: D1Database;
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname.startsWith("/api/caffes")){
            if (request.method == 'GET') {
        let { results } = await env.DB.prepare("SELECT * FROM caffes").all();
        return Response.json(results);
      } else if (request.method == 'POST') {
        const newId = crypto.randomUUID()
        const input = await request.json<any>()
        const query = `INSERT INTO caffes(id,name,description,time) values ("${newId}","${input.name}","${input.description}",${input.time})`;
        const newCaffe = await env.DB.exec(query);
        return Response.json(newCaffe);
      }
        }
        return env.ASSETS.fetch(request);
    },
}satisfies ExportedHandler<Env>;