
import app from "./app.js";
import { createServer } from 'http';

const port = process.env.PORT || 5000;

const server = createServer(app);

server.listen(port, async () => {
    console.log('HTTPS Server running on port ', port)
});
