const mysql = require('mysql');
const fs = require("fs");


class Game{
    name;
    price;
    descriptions;
    avaluatios;
    bd;
    file;

    constructor(name, price, descriptions, file){
        this.name=name
        this.price = price
        this.descriptions = descriptions
        this.file = file

        this.bd = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: "gamesjs"
        });

        this.bd.connect((err) =>{
            if(err){
                console.log(err);
            }
            console.log("conectado ao banco de dados");
        });
    }
    insertGame(){
        const comand = `INSERT INTO games (name, price, description, file) VALUES (?, ?, ?, ?)`;
        const values = [this.name, this.price, this.descriptions, this.file];
        this.bd.query(comand, values, (err)=>{
            if (err){
                console.log(err);
            }
            console.log("jogo inserido com sucesso")
        })
    }
    listGame(){
        const command = `SELECT * FROM games where name = ?`;
        const values = [this.name]
        this.bd.query(command, values, (err, data) =>{
            if(err){
                console.error(err)
                return;
            }
            data.forEach((game) => {
                const {name, file} = game
                const filePath = `../model/gamesBd/${name}.exe`

                fs.writeFile(filePath, file, 'binary', (err)=>{
                    if(err){
                        console.log(err)
                        return;
                    }else{
                        console.log(`Jogo com o nome ${name} foi salvo em ${filePath}`)
                    }
                })
            });
        })
    }
}




module.exports = Game;