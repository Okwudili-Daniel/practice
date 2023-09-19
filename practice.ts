import http, {IncomingMessage, ServerResponse} from "http";

const port: number = 9894;

interface iData{
    id: number;
    name: string;
    class: string;
}

interface iMessage {
    message: string;
    success: boolean;
    data:  null | object | {}[];
}

const Dom: iData[] = [
    {
        id: 1,
        name: "joy",
        class: "js 1"
    },
    {
        id: 2,
        name: "chioma",
        class: "ss 1"
    },
    {
        id: 3,
        name: "Isreal",
        class: "js 3"
    },
    {
        id: 4,
        name: "chisom",
        class: "ss 2"
    },
    {
        id: 5,
        name: "ebuka",
        class: "js 1"
    },
]


const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "application/json")

    const {method, url} = req;
    let status: number = 404;

    let response: iMessage = {
        message: "failed",
        success: false,
        data: null
    }

    const container: any = []
    req.on("data", (chunk: any) =>{
        container.push(chunk)
    }).on("end", () =>{
        if (url === "/" && method === "GET"){
            status = 200;
            response.message = "Success";
            response.success = true;
            response.data = Dom;
            res.write(JSON.stringify({response, status}));

            res.end();
        }

        if (url === "/" && method === "POST"){
            status = 201;
            const body = JSON.parse(container);
            Dom.push(body);
            response.message = "Added";
            response.success = true;
            response.data = Dom;
            res.write(JSON.stringify({response, status}));

            res.end();
        }
    })
})

server.listen(port, () =>{
    console.log("Created");
})