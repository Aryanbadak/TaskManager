import { Model } from "sequelize";
declare class User extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default User;
//# sourceMappingURL=User.d.ts.map