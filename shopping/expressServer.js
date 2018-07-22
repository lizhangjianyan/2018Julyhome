const express = require('express');
const history = require('connect-history-api-fallback');
const formidable = require('formidable');
const fs = require('fs');
const app = express();
app.use(history());
app.use(express.static('dist'));
//查询用户名和密码是否正确
app.post('/login/username&&password', (req, res) => {
    let form = new formidable.IncomingForm();
    (async function query() {
        let fields = await new Promise((resolve, reject) => {
            form.parse(req, function (err, fields, files) {
                if (err) reject(err);
                resolve(fields);
            })
        })
        let username = fields.username;
        let password = fields.password;
        let query;
        let data = await new Promise((resolve, reject) => {
            fs.readFile('./database/user.json', 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        })
        data = JSON.parse(data);
        if (data.every(item => item.username !== username)) {
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.json({
                msg: '用户名不正确',
                name: ''
            });
        }
        else if (!data.some(item => item.username === username && item.password === password)) {
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.json({
                msg: '用户名或密码不正确',
                name: ''
            });
        } else {
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            query = data.find(item => item.username === username && item.password === password
            )
            res.json({
                msg: '',
                name: query.name,
            });
        }
    })().catch(err=>{
        console.log(err);
    })
    /* form.parse(req, function (err, fields, files) {
        let username = fields.username;
        let password = fields.password;
        let query;
        fs.readFile('./database/user.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            if (data.every(item => item.username !== username)) {
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                res.json({
                    msg: '用户名不正确',
                    name: ''
                });
            }
            else if (!data.some(item => item.username === username&&item.password === password)) {
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                res.json({
                    msg: '用户名或密码不正确',
                    name: ''
                });
            } else {
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                query = data.find(item => item.username === username && item.password=== password
                )
                res.json({
                    msg: '',
                    name: query.name,
                });
            }
        });
    }); */
});
//查询注册时用户名书否重复
app.post("/register/username", (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let username = fields.username;
        fs.readFile('./database/user.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            if (data.some(item => item.username === username)) {
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                res.json({
                    msg: '用户名已存在',
                    name: ''
                });
            } else {
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                res.json({
                    msg: '用户名可以注册',
                    name: ''
                });
            }
        });
    })
})
//注册账号
app.post("/register", (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let username = fields.username;
        let password = fields.password;
        let name = fields.name;
        fs.readFile('./database/user.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            data.push(fields);
            data = JSON.stringify(data);
            fs.writeFile('./database/user.json', data, 'utf8', err => {
                res.json({
                    msg: '注册成功',
                    name: ''
                })
            })
        });

    })
})
app.get("/productList", (req, res) => {
    fs.readFile('./database/prodection.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        console.log(data)
       res.json(data);
    });
})
app.listen(3000);