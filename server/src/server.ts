import fastify from "fastify";
import cors from "@fastify/cors";
import { memoriesRoutes } from "./routes/memories";

const app = fastify();
app.register(cors, {
    origin: true, // all urls front can access back
});
app.register(memoriesRoutes);

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP server is running 🚀");
});
