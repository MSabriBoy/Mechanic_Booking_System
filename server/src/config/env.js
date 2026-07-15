import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = ["MONGODB_URI", "JWT_SECRET"];

const missingEnvVariables = requiredEnvVariables.filter(
    (variable) => !process.env[variable]
);

if (missingEnvVariables.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingEnvVariables.join(", ")}`
    );
}

const env = Object.freeze({
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

    adminName: process.env.ADMIN_NAME,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
});

export default env;