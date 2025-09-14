import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/db.js";
class User extends Model {
}
User.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: "User" });
export default User;
//# sourceMappingURL=User.js.map