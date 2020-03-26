'use strict'

const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: "data_perawat"
})

db.connect((err) => {
    if (err) throw err
    console.log('Database connected')
})

const createPerawatTable = () => {
    let sql = `
        create table perawat (
            id int unsigned auto_increment primary key,
            namaperawat varchar(191) not null,
            tempattanggallahir varchar(100) not null,
            gender varchar(100) not null,
            jobplace varchar(100) not null,
            jumlahperawat int unsigned default 0,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp null on update current_timestamp
        )
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        console.log('Table perawat has been created!')
    })
}

const createAdminTable = () => {
    let sql = `
        create table admin (
            id int unsigned auto_increment primary key,
            username varchar(100) not null,
            password varchar(255) not null,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp null on update current_timestamp
        )
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        console.log('Table admin has been created!')
    })
}

const createPerawatjobplaceTable = () => {
    let sql = `
        create table perawatjobplace (
            id int unsigned auto_increment primary key,
            namaruang varchar(100) not null,
            jumlahperawatruang int unsigned default 0,
            created_at timestamp default current_timestamp
        )
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        console.log('Table perawat_jobplace has been created!')
    })
}

createPerawatTable()
createAdminTable()
createPerawatjobplaceTable()

