import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME || "taskmanager", process.env.DB_USER || "root", process.env.DB_PASS || "Aryan@10", {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
});
export default sequelize;
//# sourceMappingURL=db.js.map