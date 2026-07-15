import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(env.port, () => {
      console.log(
        `Server running in ${env.nodeEnv} mode on port ${env.port}`
      );
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (!server) {
    process.exit(0);
  }

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (error) => {
  console.error(`Unhandled rejection: ${error.message}`);
  shutdown("UNHANDLED_REJECTION");
});

process.on("uncaughtException", (error) => {
  console.error(`Uncaught exception: ${error.message}`);
  process.exit(1);
});

startServer();