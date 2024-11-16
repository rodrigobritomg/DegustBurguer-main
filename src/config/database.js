module.exports = {
    dialect: 'postgres',
    host:'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'degustBurguer',
    define: {
        timestamps: true,
        underscored: true,
        underscoreAll: true, 
    }
}