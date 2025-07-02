import { DBConnection } from "./db";

export function withDB(handler) {
  return async function wrappedHandler(req, ...args) {
    try {
      await DBConnection();
      console.log("db connected")
      return await handler(req, ...args); 
    } catch (error) {
      console.error("DB Connection Error:", error);
      return new Response("Database connection failed", { status: 500 });
    }
  };
}
