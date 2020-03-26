const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express()
const secretKey = 'thisisverysecretkey'
const port = 1333


const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'data_perawat'
})

db.connect((err) => {
    if (err) throw err
    console.log('Database Connected!')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


/**************************** JWT SECTION ****************************/

const isAuthorized = (request, result, next) => {
    if (typeof(request.headers['x-api-key']) == 'undefined') {
        return result.status(403).json({
            success: false,
            message: 'Unauthorized. Token is not provided'
        })
    }

    let token = request.headers['x-api-key']

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return result.status(401).json({
                success: false,
                message: 'Unauthorized. Token is invalid'
            })
        }
    })

    next()
}

/**************************** LOGIN REGISTER SECTION ****************************/

app.post('/login', function(request, result) {
    let data = request.body
    var username = data.username;
    var password = data.password;
      if (username && password) {
          db.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
              if (results.length > 0) {
          let token = jwt.sign(data.username + '|' +data.password, secretKey)
          result.json({
            success: true,
            message: 'Logged In',
            token: token
          });
              } else {
                  result.json({
            success: false,
            message: 'Invalid Credential!',
          });
              }
              result.end();
          });
      }
  });
  
  app.post('/registeradmin', (request, result) => {
      let data = request.body
  
      let sql = `
          insert into admin (username, password)
          values ('`+data.username+`', '`+data.password+`');
      `
  
      db.query(sql, (err, result) => {
          if (err) throw err
      })
  
      result.json({
          success: true,
          message: 'Account Succesfully Registered!'
      })
  })
  
  /**************************** ADMIN & USERS SECTION ****************************/
  
  app.get('/admin', isAuthorized, (req, res) => {
    let sql = `select id, username, created_at from admin`
  
    db.query(sql, (err, result) => {
      if (err) throw err
  
      res.json({
        message: "Success Getting All Admin & User",
        data:result
      })
    })
  })
  
  app.post('/guestuser', isAuthorized, (req, res) => {
    let data = req.body
  
    let sql = `insert into admin (username, password)
    values ('`+data.username+`', '`+data.password+`')
    `
  
    db.query(sql, (err, result) => {
      if (err) throw err
  
      res.json({
        message: "User Guest Added",
        data: result
      })
    })
  })
  
  app.get('/admin/:id', isAuthorized, (req, res) => {
    let sql = `select * from admin
    where id = `+req.params.id+`
    limit 1
    `
  
    db.query(sql, (err, result) => {
      if (err) throw err
  
      res.json({
        message: "Success Getting All Admin & User Details",
        data: result[0]
      })
    })
  })
  
  app.put('/admin/:id', isAuthorized, (req, res) => {
    let data = req.body
  
    let sql = `
    update admin
    set username = '`+data.username+`',
    password = '`+data.password+`'
    where id = '`+req.params.id+`'
    `
  
    db.query(sql, (err, result) => {
      if (err) throw err
  
      res.json({
        message: "Data Has Been Updated",
        data : result
      })
    })
  })
  
  app.delete('/admin/:id', isAuthorized, (req, res) => {
      let sql = `
          delete from admin
          where id = '`+req.params.id+`'
      `
  
      db.query(sql, (err, result) => {
          if (err) throw err
  
          res.json({
              message: "Data Has Been Deleted",
              data: result
          })
      })
  })
  
  /**************************** DATA PERAWAT SECTION ****************************/

app.get('/dataperawat', isAuthorized, (req, res) => {
    let sql = `
        select id,  namaperawat, tempattanggallahir, gender, jobplace, created_at from perawat
    `
    

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Success Getting All perawat",
            data: result
        })
    })
})

app.post('/adminperawat', isAuthorized, (req, res) => {
    let data = req.body

    let sql = `
        insert into perawat (namaperawat, tempattanggallahir, gender, jobplace)
        values ('`+data.namaperawat+`', '`+data.tempattanggallahir+`', '`+data.gender+`', '`+data.jobplace+`')
    `
    
    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "perawat Added",
            data: result
        })
    })

    db.query(`
        update perawat
        set jumlahperawat = jumlahperawat + 1
        where id = '`+req.params.id+`'
    `, (err, result) => {
        if (err) throw err
    })

})




app.get('/perawat/:id', isAuthorized, (req, res) => {
    let sql = `
        select * from perawat
        where id = `+req.params.id+`
        limit 1
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Success Getting Perawat Details",
            data: result[0]
        })
    })
})

app.put('/perawat/:id', isAuthorized, (req, res) => {
    let data = req.body

    let sql = `
        update perawat
        set namaperawat = '`+data.namaperawat+`', tempattanggallahir = '`+data.tempattanggallahir+`', gender = '`+data.gender+`', jobplace = '`+data.jobplace+`'
        where id = '`+req.params.id+`'
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Data Has Been Updated",
            data: result
        })
    })
})

app.delete('/perawat/:id', isAuthorized, (req, res) => {
    let sql = `
    delete from perawat
    where id = '`+req.params.id+`'
`

db.query(sql, (err, result) => {
    if (err) throw err

    res.json({
        message: "Data Has Been Deleted",
        data: result
    })
})
})


/**************************** PERAWAT JOBPLACE SECTION ****************************/

app.get('/perawatjobplace', isAuthorized, (req, res) => {
    let sql = `
        select id, namaruang, jumlahperawatruang, created_at from perawatjobplace
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Success Getting All Jobplace",
            data: result
        })
    })
})

app.post('/perawatjobplace', isAuthorized, (req, res) => {
    let data = req.body

    let sql = `
        insert into perawatjobplace (namaruang, jumlahperawatruang)
        values ('`+data.namaruang+`', '`+data.jumlahperawatruang+`')
    `
    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "jobplace Added",
            data: result
        })
    })

    
})


app.get('/perawatjobplace/:id', isAuthorized, (req, res) => {
    let sql = `
        select * from perawatjobplace
        where id = `+req.params.id+`
        limit 1
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Success Getting jobplace Details",
            data: result[0]
        })
    })
})

app.delete('/perawatjobplace/:id', isAuthorized, (req, res) => {
    let sql = `
        delete from perawatjobplace
        where id = '`+req.params.id+`'
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Data Has Been Deleted",
            data: result
        })
    })
})




/**************************** TRANSACTION SECTION ****************************/

app.post('/perawatjoblace/:id/take', isAuthorized, (req, res) => {
    let data = req.body

    db.query(`
        insert into perawatjobplace  (admin_id, perawatjobplace_id)
        values ('`+data.admin_id+`', '`+req.params.id+`')
    `, (err, result) => {
        if (err) throw err
    })

    db.query(`
        update perawatjobplace
        set jumlahperawatruang = jumlahperawatruang - 1
        where id = '`+req.params.id+`'
    `, (err, result) => {
        if (err) throw err
    })

    res.json({
        message: "perawatruang Has Been Increase By Admin"
    })
})

app.get('/users/:id/books', isAuthorized, (req, res) => {
    db.query(`
        select books.title, books.author, books.year
        from users
        right join user_book on users.id = user_book.user_id
        right join books on user_book.book_id = books.id
        where users.id = '`+req.params.id+`'
    `, (err, result) => {
        if (err) throw err

        res.json({
            message: "Success Getting User Book",
            data: result
        })
    })
})

/**************************** RUN APP SECTION ****************************/

app.listen(port, () => {
    console.log('App running on port ' + port)
})
