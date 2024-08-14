import db from './clients/db.mysql.js';

async function main() {

    await db.query(`
        CREATE TABLE IF NOT EXISTS users(
            id BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(32 ) NOT NULL
            
            )
    `);
    await db.query(`
        CREATE TABLE IF NOT EXISTS tasks(
        id bigint auto_increment not null primary key ,
        title varchar(50) not null ,
        description text not null ,
        user_id bigint not null ,
        foreign key (user_id) references users(id)
            )
    `)
}
main().catch((err) => {
    console.log(err);
})