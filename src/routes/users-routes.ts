import { FastifyInstance, FastifyRequest } from "fastify";
import z from "zod";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const UsersRoutes = async (app: FastifyInstance) => {
  let users: User[] = [];

  app.delete("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const user = users.filter(
      (user) => user.id !== paramsSchema.parse(request.params).id
    );

    if (!user) {
      return reply.status(404).send({ message: "Resource not found" });
    }

    users = user;

    reply.status(200).send();
  });

  app.get("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const user = users.find(
      (user) => user.id === paramsSchema.parse(request.params).id
    );

    if (!user) {
      return reply.status(404).send({ message: "Resource not found" });
    }

    

    reply.status(201).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  });

  app.get("/", async (_, reply) => {
    const userMapped = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));

    reply.send(userMapped);
  });

  app.post("/", async (request: FastifyRequest, reply) => {
    const newUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const newUser = newUserSchema.parse(request.body);

    const alreadyExists = users.find((user) => user.email === newUser.email);

    if (alreadyExists) {
      return reply.status(400).send({ message: "User already exists" });
    }

    users.push({
      id: randomUUID(),
      name: newUser.name,
      email: newUser.email,
      password: await hash(newUser.password, 6),
    });
    reply.status(201).send();
  });
};
