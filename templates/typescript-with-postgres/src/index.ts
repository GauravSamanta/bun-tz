import { app } from "./app.js";
// import { sql } from "./db/dbConnect.js";

async function startServer() {
  try {
    // const result = await sql`select version()`;
    // console.log(result);
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\n Server listening to port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
startServer();
