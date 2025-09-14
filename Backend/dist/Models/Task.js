import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/db.js";
import User from "./User.js";
class Task extends Model {
}
Task.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize,
    modelName: "Task"
});
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });
export default Task;
//# sourceMappingURL=Task.js.map