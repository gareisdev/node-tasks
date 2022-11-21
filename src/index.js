const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || "8000";
const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
} = require("./config/config");
const { routerTasks } = require("./routers/tasks.routes");
const { routerUsers } = require("./routers/user.routes");

app.use(express.json());

const connect_db = () => {
    mongoose
        .connect(
            `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authSource=admin`
        )
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.error(`Something goes wrong: ${err}`);
            setTimeout(() => connect_db(), 5000);
        });
};

connect_db();

app.use("/api/v1/tasks", routerTasks);
app.use("/api/v1/users", routerUsers);

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
