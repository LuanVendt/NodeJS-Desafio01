import { Database } from '../src/config/database.js';
import readline from "readline"
import  fs from "fs"
import { randomUUID } from 'crypto';

const database = new Database()


const line = readline.createInterface({
    input: fs.createReadStream("testeCSV.csv")
})

let firstLine = true
line.on("line", (data) => {
    let csv = data.split(",")

    if (firstLine) {
        firstLine = false
        return
    }
    database.insert('file', {
        id: randomUUID(),
        title: csv[0],
        description: csv[1],
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null
    })
    console.log(csv)
})