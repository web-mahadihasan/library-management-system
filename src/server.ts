import 'dotenv/config';
import { Server } from "http";
import app from "./app";
import connectDatabase from './app/config/database';

let server: Server
const PORT = process.env.PORT || 8000

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase()
    server = app.listen(PORT, () => {
      console.log(`\x1b[1m\x1b[35m🚀 Server connected port ${PORT}\x1b[0m`)    
    })
  } catch (err) {
    console.log("Failed to connect database");
    process.exit(1);
  }
}

startServer()