interface Env {
    ASSETS: Fetcher
}

export default {
    fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname.startsWith("/api/caffes")){
            return Response.json([
                {
                    id: '1',
                    name: "Espresso",
                    description: "A strong and bold coffee brewed by forcing hot water through finely-ground coffee beans.",
                    time: "1741247092",
                },
                {
                    id: '2',
                    name: "Latte",
                    description: "A creamy coffee drink made with espresso and steamed milk.",
                    time: "1741246092",
                },
                {
                    id: '3',
                    name: "Cappuccino",
                    description: "A rich coffee drink made with equal parts espresso, steamed milk, and frothed milk.",
                    time: "1741245092",
                },
            ]);
        }
        return env.ASSETS.fetch(request);
    },
}satisfies ExportedHandler<Env>;