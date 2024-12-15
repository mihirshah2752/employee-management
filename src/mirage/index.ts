import { createServer, Model, Factory, Response } from "miragejs";
import { Employee } from "../utils/fetchers";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,
    models: {
      employee: Model.extend<Partial<Employee>>({}),
    },
    factories: {
      employee: Factory.extend<Partial<Employee>>({
        name(i: number) {
          return `Employee ${i + 1}`;
        },
        position() {
          return "Developer";
        },
        department() {
          return "IT";
        },
        contact() {
          return (
            Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) +
            1000000000
          );
        },
      }),
    },

    seeds(server) {
      server.createList("employee", 10);
    },

    routes() {
      this.namespace = "api";

      this.get("employee");

      this.post("/employee", (schema: any, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.employees.create(attrs);
      });

      this.delete("/employee/:id", (schema: any, request) => {
        const { id } = request.params;
        const employee = schema.employees.find(id);

        if (employee) {
          employee.destroy();
          return new Response(
            200,
            {},
            { success: true, message: "Employee deleted" }
          );
        }
        return new Response(
          404,
          {},
          { success: false, error: "Employee not found" }
        );
      });

      this.put("/employee/:id", (schema: any, request) => {
        let attrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        return schema.employees.find(id)?.update(attrs);
      });
    },
  });
}
