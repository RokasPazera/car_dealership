import {createServer} from "./server.js";

const port = 3000;


const app = createServer();



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})