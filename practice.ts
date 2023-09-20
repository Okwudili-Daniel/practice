

import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";
const port: number = 1010;

interface iData {
  food: string
  name: string
}

interface iMessage {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

const Nineth: iData[] = [
    {
        food: "Rice & Beans",
        name: "Daniel"
    },
    {
        food: "Fried Rice with salad",
        name: "prince"
    },
    {
        food: "Beans and plantain",
        name: "favour"
    },
    {
        food: "white soup",
        name: "Sunday"
    },
    {
        food: "Rice & Beans",
        name: "job"
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
          response.data = Nineth;
          res.write(JSON.stringify({response, status}));
          res.end();
        }
        if (url === "/" && method === "POST") {
          status = 201;
          const body = JSON.parse(container);
          Nineth.push(body);
          response.message = "Added";
          response.success = true;
          response.data = Nineth;
          res.write(JSON.stringify({response, status}));

          res.end();
        }
      });
  }
);

server.listen(port, () => {
  console.log("Created");
});