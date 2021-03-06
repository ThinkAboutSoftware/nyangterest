const fs = require("fs");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const FileStore = require("session-file-store")(session);
const bcryptjs = require("bcryptjs");

// db접속
const data = fs.readFileSync(__dirname + "/db.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

// 환경설정 연결 초기화
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

connection.connect();

router.use(
    session({
        name: "nyangterest_session",
        secure: true,
        secret: "abcde",
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
        cookie: { secure: true },
    })
); // 세션 활성화
router.use(passport.initialize()); // passport 구동
router.use(passport.session()); // 세션 연결

passport.serializeUser((user, done) => {
    // Strategy 성공 시 호출됨
    console.log("serializeUser", user[0].email);
    done(null, user[0].email); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((id, done) => {
    // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    console.log("deserializeUser", id);
    connection.query(
        `SELECT * FROM nyang_member WHERE email='${id}'`,
        (err, rows, fields) => {
            done(null, rows[0].email); // 여기의 user가 req.user가 됨
        }
    );
});

passport.use(
    new LocalStrategy(
        {
            // local 전략을 세움
            usernameField: "userId",
            passwordField: "userPassword",
            session: true, // 세션에 저장 여부
            passReqToCallback: false,
        },
        (id, password, done) => {
            console.log("id:", id, "pw:", password, "done:", done);
            connection.query(
                `SELECT * FROM nyang_member WHERE email='${id}'`,
                function (err, result) {
                    if (err) {
                        console.log("err sql query :" + err);
                        return done(false, null);
                    }

                    if (result.length < 1) {
                        console.log("해당 유저가 없습니다");
                        return done(false, null);
                    }

                    if (!result[0].certify) {
                        console.log("메일인증이 완료되지 않았습니다");
                        return done(false, null);
                    }

                    bcryptjs.compare(
                        password,
                        result[0].password,
                        (err, res) => {
                            if (!res || err) {
                                console.log("패스워드가 일치하지 않습니다");
                                return done(false, null);
                            }

                            console.log(result[0].email, "님 :로그인 성공");
                            return done(null, result);
                        }
                    );
                }
            );
        }
    )
);

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "http://localhost:3000/",
    }),
    (req, res) => {
        console.log("유저", req.user);
        console.log("세션", req.session);
        const userId = req.session.passport.user;
        res.json({
            sucess: true,
            _userId: userId,
        });
    }
);

router.get("/logout", (req, res) => {
    console.log("로그아웃");
    req.logout(); //passportjs에 있는 기능
    req.session.save(() => {
        res.redirect("/");
    });
});
module.exports = router;
