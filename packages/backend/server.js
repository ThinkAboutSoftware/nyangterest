const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = 8080;
const login = require('./login');
const memberInfo = require('./memberInfo');
const findAccount = require('./findAccount');
const join = require('./join');
const logger = require('./winston')
const unregister = require('./unregister')

require('dotenv').config()

const serviceKey = process.env.SERVICE_KEY;

const api = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';


const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

async function err() {
	throw new Error('에러 발생');
}

// 기본주소
router.post("/page/:bgnde/:endde/:kind/:numOfRows/:id/", doAsync(async (req, res) => {

	const getData = async (url) => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const body = await json.response.body;
			return body;

		} catch (error) {
			console.log(error);
		}
	};

	const { bgnde, endde, numOfRows, id, kind } = req.params;
	const { searchField } = req.body;


	// 기본 url

	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	const totalRes = await getData(url)

	const completeUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${numOfRows}&pageNo=${id}`;

	const completeRes = await getData(completeUrl);
	// const completeItems = completeRes.items;

	const selectRes = (kind === "000116") ? totalRes : completeRes;

	const te = { success: "test" }
	console.log(req.body.searchField, te)

	res.send(selectRes)

	// const selectItems = selectRes.items


	// const strObj = {
	// 	"F": "암컷",
	// 	"M": "수컷",
	// 	"Q": "성별 미상",
	// 	"Y": "중성화O",
	// 	"N": "중성화X",
	// 	"U": "중성화 미상",
	// 	"한국 고양이": "코리안숏헤어"
	// }

	// const filteredItems = Array.from(selectItems.filter(item => {
	// 	// let re = new RegExp(Object.keys(strObj).join("|"), "gi");
	// 	// let regExp = /[()]/gi;
	// 	// let searchKeyword = searchField.toUpperCase().trim()

	// 	if (typeof item === "object") {
	// 		return (
	// 			item
	// 			// Object.keys(item).some(
	// 			// 	key =>
	// 			// 		typeof item[key] === "string" &&
	// 			// 		item[key].replace(re, (matched => {
	// 			// 			return strObj[matched]
	// 			// 		})).replace(regExp, "").toUpperCase().includes(searchKeyword)

	// 			// 	, console.log(searchField)
	// 			// )
	// 		);
	// 	} else {
	// 		return null;
	// 	}

	// }))

	// console.log(filteredItems)


}))

// 품종
router.get("/search/kind", (req, res) => {
	const url = `${api}/kind?ServiceKey=${serviceKey}&_type=json&up_kind_cd=422400`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body.items);
			// console.log(json.response.body.items.item[0].kindCd)

		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
})

// router.post("/input/", doAsync(async (req, res) => {

// 	const { searchField } = req.body;

// 	const te = { success: "test" }
// 	console.log(req.body.searchField, te)
// 	res.send(req.body)

// }))


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
	database: conf.database
});

connection.connect();

app.get("/admin/member", (req, res) => {
	connection.query("SELECT * FROM member", (err, rows, fields) => {
		res.send(rows);
		// console.log(rows.id);
	});
});

app.use(express.json());

// // 중첩된 객체표현 허용여부
app.use(express.urlencoded({ extended: false }));

// 정적파일 서비스
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use(cors());
app.use("/", router);
// app.use("/search", router);
// app.use("/admin/member", router);

// 회원가입 미들웨어
app.use("/", join);
// 로그인 미들웨어
app.use("/", login);
// 회원정보 수정 미들웨어
app.use("/", memberInfo);
// 계정찾기 미들웨어
app.use("/account", findAccount);
// 회원탈퇴
app.use("/unregister", unregister);

app.listen(PORT, function () {
	logger.info("enabled web server listening !");
	// console.log("enabled web server listening !");
});

module.exports = app;
