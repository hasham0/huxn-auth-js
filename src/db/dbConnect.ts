import { env } from "@/lib/env";
import { ConnectionObject } from "@/types";
import mongoose from "mongoose";

const connection: ConnectionObject = {};

async function dbConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connted to database");
    return;
  }
  try {
    const db = await mongoose.connect(env.MONGO_DB_URI || "", {
      dbName: "next_auth_huxn_tt",
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("db connected successfully");
  } catch (error) {
    const err = (error as { message: string }).message;
    console.error("🚀 ~ dbConnection ~ error:", err);
    process.exit(1);
  }
}

export default dbConnection;
