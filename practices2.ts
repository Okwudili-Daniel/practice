import http, { IncomingMessage, ServerResponse } from "http"

const port = 3500

interface IMessage{
    message: string
    success: boolean
    data: null | {} | {}[]
}


    let Data = [
        {
            id: 1,
            name: "Daniel",
            age: 20,
        },
        {
            id: 2,
            name: "Daniel",
            age: 20,
        },
        {
            id: 3,
            name: "Daniel",
            age: 20,
        },
        {
            id: 4,
            name: "Daniel",
            age: 20,
        },
        {
            id: 5,
            name: "Daniel",
            age: 20,
        },
        {
            id: 6,
            name: "Daniel",
            age: 20,
        },
    ]

const server = http.createServer((req:IncomingMessage, res: ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "application/json");

    const {method, url} = req
    let status = 404;

    let response: IMessage ={
        message: "Failed",
        success: false,
        data: null,
    }

    let Contanier: any = []

    req.on("data", (chunk: any) =>{
        Contanier.push(chunk)

    }).on("end", () =>{

        // Get Method
        if (url === "/" && method === "GET") {
            status = 200;

            response.message = "Success"
            response.success = true
            response.data = Data
            res.write(JSON.stringify({status, response}))

            res.end()            
        }

        // Post Method
        if (url === "/" && method === "POST") {
            status = 201;
            const body = JSON.parse(Contanier)
            Data.push(body)

            response.message = "Added"
            response.success = true
            response.data = Data
            res.write(JSON.stringify({status, response}))
            res.end()            
        }

        // Put method
        if(method === "PUT"){
            const body = JSON.parse(Contanier)

            let Link:any = url?.split("/")[1]
            let num = parseInt(Link)

            let find = Data.some((el) =>{
                return el.id === num
            })

            if (find === false) {
                status = 404;

                (response.message = "User not found");
                (response.success = false);
                (response.data = Data)
            }else{
                const updatename = body.name
                const updateage = body.age

                Data = Data.map((user: any) =>{
                    if (user?.id === num) {
                        return {
                            id: user?.id,
                            name: updatename,
                            age: updateage
                        }
                    }
                    return user
                })
                status = 200;
                (response.message = "Updated");
                (response.success = true);
                (response.data = Data);
                res.write(JSON.stringify({status, response}))
                res.end()
            }
        }

        // Patch method
        if(method === "PATCH"){
            const body = JSON.parse(Contanier)

            let Link: any = url?.split("/")[1]
            let num = parseInt(Link)

            let find = Data.some((el) =>{
                return el.id === num
            })

            if (find === false){
                status = 404;
                (response.message = "User not found");
                (response.success = false);
                (response.data = null);

                res.write(JSON.stringify({status, response}))
                res.end()

            }else{
                const updatename = body.name

                Data = Data.map((user: any) =>{
                    if(user?.id === num){
                        return{
                            id: user?.id,
                            name: updatename,
                            age: user?.age
                        }
                    }
                    return user
                })
                status = 200;
                (response.message = "Updated");
                (response.success = true);
                (response.data = Data)
                res.write(JSON.stringify({status, response}))
                res.end()
            }
        }

        // Delete method
        if(method === "DELETE"){
            const body = JSON.parse(Contanier)

            let Link: any = url?.split("/")[1]
            let num = parseInt(Link)

            Data = Data.filter((el) =>{
                return el.id !== num
            })

            response.message = "User deleted"
            response.success = true
            response.data = Data
            res.write(JSON.stringify(response))
            res.end()
        }

        // Get One
        if(method === "GET"){
            const body: any = url?.split("/")[1]
            let Link = parseInt(body)
            

            let test = Data.filter((el) =>{
                return el.id === Link
            })

            response.message = "Gotten"
            response.success = true
            response.data = test
            res.write(JSON.stringify({response}))
            res.end()
        }
    })
    
})

server.listen(port, () =>{
    console.log("Awaiting");
    
})