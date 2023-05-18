import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import { memoriesRoutes } from "./routes/memories";
import jwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth";

const app = fastify();
app.register(cors, {
    origin: true, // all urls front can access back
});
app.register(jwt, {
    secret: "spacetime",
});
app.register(memoriesRoutes);
app.register(authRoutes);

app.listen({
    port: 3333,
    host: "0.0.0.0",
}).then(() => {
    console.log("HTTP server is running 🚀");
});
