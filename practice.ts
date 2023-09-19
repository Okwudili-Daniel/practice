import http, {IncomingMessage, ServerResponse} from "http"

const port: number = 8888

interface iData {
    id: number,
    name: string,
    height: number,
    stack: string,
}

interface iMessage{
    message: string,
    success: boolean,
    data: null | object | {}[]
}

const details:iData[] = [
    {
        id: 1,
        name: "Daniel",
        height: 90.5,
        stack: "full-stack"
    },
    {
        id: 2,
        name: "Dan",
        height: 90.5,
        stack: "full-stack"
    },
    {
        id: 3,
        name: "uju",
        height: 90.5,
        stack: "full-stack"
    },
    {
        id: 4,
        name: "viccky",
        height: 90.5,
        stack: "full-stack"
    },
    {
        id: 1,
        name: "Daniel",
        height: 90.5,
        stack: "full-stack"
    },
]

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "application/json")

    const {method, url} = req

    let status = 404

    let response: iMessage = {
        message: "failed",
        success: false,
        data: null,
    }

    const container: any = []
    req.on("data", (chunk: any) =>{
        container.push(chunk);
    }).on("end", () =>{
        if (url === "/" && method === "GET"){
            status = 200;
            response.message = "All details";
            response.success = true;
            response.data = details;
            res.write(JSON.stringify({response, status}));

            res.end()
        }

        // post method
        if (url === "/" && method === "POST"){
            status = 201;
            const body = JSON.parse(container)
            details.push(body);
            response.message = "Success";
            response.success = true;
            response.data = details;
            res.write(JSON.stringify({response, status}))

            res.end()
        }
    })
})

server.listen(port, () =>{
    console.log("Done")
})