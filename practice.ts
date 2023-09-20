

import http, { IncomingMessage, ServerResponse } from "http";
import event from "events";
const port: number = 1010;

interface iData {
  id: number;
 color: string
}

interface iMessage {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

const seventh: iData[] = [
    {
        id: 9,
        color: "pink",
    },
    {
        id: 8,
        color: "gold",
    },
    {
        id: 7,
        color: "green",
    },
    {
        id: 6,
        color: "blue",
    },
    {
        id: 5,
        color: "pink",
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
          response.data = seventh;
          res.write(JSON.stringify({status, response }));
          res.end();
        }
        if (url === "/" && method === "POST") {
          status = 201;
          const body = JSON.parse(container);
          seventh.push(body);
          response.message = "Added";
          response.success = true;
          response.data = seventh;
          res.write(JSON.stringify({status, response }));

          res.end();
        }
      });
  }
);

server.listen(port, () => {
  console.log("Created");
});