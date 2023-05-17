import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function memoriesRoutes(app: FastifyInstance) {
    app.get("/memories", async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
        return memories.map((memory) => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.substring(0, 115).concat("..."),
            };
        });
    });
    app.get("/memories/:id", async (req: FastifyRequest) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(req.params);
        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            },
        });
        return memory;
    });
    app.post("/memories", async (req: FastifyRequest) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        });

        const { content, isPublic, coverUrl } = bodySchema.parse(req.body);

        const memory = await prisma.memory.create({
            data: {
                content,
                isPublic,
                coverUrl,
                userId: "1",
            },
        });
        return memory;
    });
    app.put("/memories/:id", async (req: FastifyRequest) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        });
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { content, isPublic, coverUrl } = bodySchema.parse(req.body);
        const { id } = paramsSchema.parse(req.params);

        const memory = await prisma.memory.update({
            where: { id },
            data: {
                content,
                isPublic,
                coverUrl,
            },
        });
        return memory;
    });
    app.delete("/memories/:id", async (req: FastifyRequest) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(req.params);
        await prisma.memory.delete({
            where: {
                id,
            },
        });
    });
}
