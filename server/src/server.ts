import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { memoriesRoutes } from "./routes/memories";
import jwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify();
app.register(multipart);
app.register(require("@fastify/static"), {
    root: resolve(__dirname, "../uploads"),
    prefix: "/uploads",
});
app.register(cors, {
    origin: true, // all urls front can access back
});
app.register(jwt, {
    secret: "spacetime",
});
app.register(memoriesRoutes);
app.register(uploadRoutes);
app.register(authRoutes);

app.listen({
    port: 3333,
    host: "0.0.0.0",
}).then(() => {
    console.log("HTTP server is running 🚀");
});
