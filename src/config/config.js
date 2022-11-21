module.exports = {
    MONGO_HOST: process.env.MONGO_HOST || "mongo-server",
    MONGO_PORT: process.env.MONGO_PORT || "27017",
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    SALT_ROUNDS_NUMBER: 50 
}