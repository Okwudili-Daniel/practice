import http, {IncomingMessage, ServerResponse} from "http"

const port = 7674;

interface iMessage{
    message: string;
    success: boolean;
    data: null | object | {}[]
}

const third = [
    {
        postition: 1,
        name: "ebuka",
        sch: "tolu"
    },
    {
        postition: 2,
        name: "victoria",
        sch: "tolu"
    },
    {
        postition: 3,
        name: "victor",
        sch: "tolu"
    },
    {
        postition: 4,
        name: "lovelny",
        sch: "tolu"
    },
    {
        postition: 5,
        name: "ebuka",
        sch: "tolu"
    },
]

const server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "application/json")

    const {method, url} = req
    let status = 401;

    let response: iMessage ={
        message: "failed",
        success: false,
        data: null
    }

    const container:any = []
    req.on("data", (chunk: any) =>{
    
        container.push(chunk)

    }).on("end", () =>{
        
        if(url === "/" && method === "GET"){
            status === 200;
            response.message = "Success"
            response.success = true
            response.data = third;
            res.write(JSON.stringify({status, response}))

            res.end()
        }

        if (url === "/" && method === "POST"){
            status === 201;
            const body = JSON.parse(container);
            third.push(body);
            response.message = "Added"
            response.success = true
            response.data = third;
            res.write(JSON.stringify({status, response}))

            res.end()
        }
    })
})

server.listen(port, () =>{
    console.log("Done")
})