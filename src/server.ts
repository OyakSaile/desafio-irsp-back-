import { app } from "./app";
import { UsersRoutes } from "./routes/users-routes";
import cors from '@fastify/cors'

app.listen({ port: 3333 }, () => {
  console.log("Server is running on port 3333");
});

app.register(cors)
app.register(UsersRoutes, { prefix: "/users" });
