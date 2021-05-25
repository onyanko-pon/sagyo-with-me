import { Sequelize } from 'sequelize';

let sequelize

if (process.env.NODE_ENV === "production") {
    // TODO エラーをだす
    const DATABASE_URL: string = process.env.DATABASE_URL ?? ""
    console.log("connect production database")
    sequelize = new Sequelize(DATABASE_URL, {
        dialectOptions: {
            ssl: true
        }
    })
} else {
    console.log("connect development database")

    // TODO undefinedの時にエラー出したい
    const DB_NAME: string = process.env.DB_NAME ?? ""
    const DB_USERNAME: string = process.env.DB_USERNAME ?? ""
    const DB_PASSWORD: string = process.env.DB_PASSWORD ?? ""
    const DB_HOST: string = process.env.DB_HOST ?? ""
    const DB_PORT: number = parseInt(process.env.DB_PORT ?? "0")

    // TODO エラー出す
    sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        // dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        // define: {
        //   timestamps: false
        // }
    });
}

export default sequelize