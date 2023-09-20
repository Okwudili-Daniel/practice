

import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";
const port: number = 1010;

interface iData {
  age: number
  name: string
}

interface iMessage {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

const Tenth: iData[] = [
    {
        age: 19,
        name: "Emma"
    },
    {
        age: 30,
        name: "Ayo"
    },
    {
        age: 9,
        name: "faith"
    },
    {
        age: 15,
        name: "joan"
    },
    {
        age: 20,
        name: "bob"
    },
    {
        age: 19,
        name: "Emma"
    },
]

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "application/json");
    const { method, url } = req;
    let status: number = 404;

    let response: iMessage = {
      message: "failed",
      success: false,
      data: null,
    };
    const container: any = [];
    req
      .on("data", (chunk: any) => {
        container.push(chunk);
      })
      .on("end", () => {
        if (url === "/" && method === "GET") {
          status = 200;
          response.message = "All set08 data gotten";
          response.success = true;
          response.data = Tenth;
          res.write(JSON.stringify({response, status}));
          res.end();
        }
        if (url === "/" && method === "POST") {
          status = 201;
          const body = JSON.parse(container);
          Tenth.push(body);
          response.message = "Added";
          response.success = true;
          response.data = Tenth;
          res.write(JSON.stringify({response, status}));

          res.end();
        }
      });
  }
);

server.listen(port, () => {
  console.log("Created");
});