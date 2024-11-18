import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcrypt';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            },
        );

        this.addHook('beforeSave', async (user) =>{
            if (user.password) {
           user.password = await bcrypt.hash (user.password, 10);
        }    
        })
    }
}

export default User;
