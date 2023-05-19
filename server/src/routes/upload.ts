import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { FastifyInstance } from "fastify";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
const pump = promisify(pipeline);
export async function uploadRoutes(app: FastifyInstance) {
    app.post("/upload", async (req, res) => {
        const upload = await req.file({
            limits: {
                fileSize: 5242880, // 5MB
            },
        });
        if (!upload) {
            return res.status(400).send();
        }
        // validates if the file is image or video
        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);

        if (!isValidFileFormat) {
            return res.status(400).send();
        }

        console.log(upload.filename);

        const fileId = randomUUID();
        const extension = extname(upload.filename);

        const filename = fileId.concat(extension);

        const writeStream = createWriteStream(
            resolve(__dirname, "../../uploads/", filename),
        );
        await pump(upload.file, writeStream);
        const fullUrl = req.protocol.concat("://").concat(req.hostname);
        const fileUrl = new URL(`/uploads/${filename}`, fullUrl).toString();
        return { fileUrl };
    });
}
