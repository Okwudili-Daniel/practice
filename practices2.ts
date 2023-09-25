import http, { IncomingMessage, ServerResponse } from "http"

const port= 1500

interface iData {
    id: number,
    age: number
    name: string,
}

interface iMessage{
    message: string,
    success: boolean,
    data: null | object | {}[]
}

let Data: iData[] = [
    {
        id: 1,
        age: 10,
        name: "Daniel"
    },
    {
        id: 2,
        age: 10,
        name: "soludo"
    },
    {
        id: 3,
        age: 10,
        name: "caleb"
    },
    {
        id: 4,
        age: 10,
        name: "mom"
    },
    {
        id: 5,
        age: 10,
        name: "dad"
    },
]


const server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "application/json")

    const {method, url} = req
    let status = 404

    let response: iMessage = {
        message: "failed",
        success: false,
        data: null
    }

    let Container:any = []

    req.on("data", (chunk: any) =>{
        Container.push(chunk)

    }).on("end", () =>{
        if(url === "/" && method === "GET"){
            status = 200

            response.message = "Succesed";
            response.success = true;
            response.data = Data;
            res.write(JSON.stringify({status, response}))

            res.end()
        }

        if(url === "/" && method === "POST"){
            status = 201

            const body = JSON.parse(Container);
            Data.push(body)

            response.message = "Added",
            response.success = true,
            response.data = Data
            res.write(JSON.stringify({status, response}))

            res.end()
        }

        // patch

        if(method === "PATCH"){
            const build = JSON.parse(Container)

            let Link: any = url?.split("/")[1]
            let Unlink = parseInt(Link)

            let $object = Data.some((el) =>{
                return el.id === Unlink;
            })

            if($object === false){
                status = 404;

                (response.message = "User not found");
                (response.success = false);
                (response.data = null)
                res.write(JSON.stringify({status, response}))

                res.end()
            }else{
                const update = build.name;

                Data = Data.map((user: any) =>{
                    if(user?.id === Unlink){
                        return{
                            id: user?.id,
                            name: update
                        }
                    }
                    return user
                })

                status = 200;

                (response.message = "Updated");
                (response.success = true);
                (response.data = Data);
                res.write(JSON.stringify({status, response}));

                res.end()
            }
        }

        // Put

        if(method === "PUT"){
            const build = JSON.parse(Container)

            const Link: any = url?.split("/")[1]
            const parse = parseInt(Link)

            let $object = Data.some((el) =>{
                return el.id === parse
            })

            if($object === false){
                status = 401;

                (response.message= "Not Found");
                (response.success= false);
                (response.data = null)
                res.write(JSON.stringify({status, response}))

                res.end()
            }else{
                const update = build.name
                const updateag = build.age

                Data = Data.map((user: any) =>{
                    if(user?.id === parse) {
                        return {
                            id: user?.id,
                            age: updateag,
                            name: update,
                        }
                    }
                    return user
                })

                status = 200;

                (response.message = "Udated");
                (response.success = true);
                (response.data = Data)
                res.write(JSON.stringify({status, response}))

                res.end()
                
            }
        }

    })
})

server.listen(port, () =>{
    console.log("Done");
    
})