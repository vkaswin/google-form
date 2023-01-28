"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./src/database/config"));
const routes_1 = __importDefault(require("./src/routes"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: false }))
    .use("/form", express_1.default.static("public/form"))
    .use("/template", express_1.default.static("public/template"))
    .use(routes_1.default);
(0, config_1.default)()
    .then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
