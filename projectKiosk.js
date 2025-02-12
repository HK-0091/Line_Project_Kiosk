let ws = require('express');
let app = ws();
let mysql = require('mysql');
let con = mysql.createConnection({
	host: 'localhost',
	user: 'c17st04',
	password: 'Cc0VDRloLUXo07L9',
	database: 'c17st04',
});

app.locals.pretty = true;
app.use(ws.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));

app.set('view engine','pug');
app.set('views','./views');
app.get('/',(req,res)=>{
	con.connect((err)=>{
		//if(err) throw err;
		console.log('CONNECT!');
		let sql = 'select * from Menu_table';
		con.query(sql, (err,result)=>{
			if(err) throw err;
			

			let tempCount = 0;

			//숫자 값 천 단위로 바꾸기
			function menuPriceChangeValue(value){
				let tempPriceValue = [];
				let tempPriceResultValue = [];
				let tempValueContent = `${value}`;
				for(let i=0; i<tempValueContent.length; i++){
					tempPriceValue[i] = tempValueContent[i];
				}
				for(let i=0; i<tempValueContent.length; i++){
					if(i%3 ==0 && i!=0){
						tempPriceResultValue.unshift(",");
					}
					tempPriceResultValue.unshift(tempPriceValue.pop());
				}
				let resultValue = tempPriceResultValue.join("");
				return resultValue;
			}

			//recommendationMenu 1-6
			let tempA = '';
			let resultCount = 0;
			for(let i=0; i<3; i++){
				tempA += `<div class="menuItemBox menuItemBoxA${i}" id="menuItemBoxA${i}">`;
				for(let j=0; j<4; j++){
					if(resultCount > 5){
						break;
					}
					tempA += 
					`<div class="menuItem menuItem`+ tempCount +`">
						<img class="menuImage`+ tempCount +`" id="`+ tempCount +`" src="`+ result[resultCount].image + `" alt="` + result[resultCount].menu_id + `">
						<div class="menuInfoText${tempCount}">
							<p>
								1회 제공량 (${result[tempCount].menu_amount})<br>
								칼로리 (${result[tempCount].menu_cal})<br>
								당류 (${result[tempCount].menu_sugar})<br>
								단백질 (${result[tempCount].menu_protein})<br>
								포화지방 (${result[tempCount].menu_fat})<br>
								나트륨 (${result[tempCount].menu_salt})
							</p>
						</div>
						<i id="menuInfoIcon${tempCount}" class="xi-zoom-in"></i>
						<p class="menuText${tempCount}">` + result[resultCount].menu_id + '<br>' + menuPriceChangeValue(result[resultCount].menu_price) + `원</p>
					</div>`;
					resultCount++;
					tempCount++;
				}
				tempA += '</div>';
				if(resultCount > 5){
					break;
				}
			}
			
			//icecreamGreekyogurt 7-18
			let tempB = '';
			let resultCountB = 6;
			for(let i=0; i<3; i++){
				tempB += `<div class="menuItemBox menuItemBoxB${i}" id="menuItemBoxB${i}">`;
				for(let j=0; j<4; j++){
					if(resultCountB > 17){
						break;
					}
					tempB +=
					`<div class="menuItem menuItem`+ tempCount +`">
						<img class="menuImage`+ tempCount +`" id="`+ tempCount +`" src="`+ result[resultCountB].image + `" alt="` + result[resultCountB].menu_id + `">
						<div class="menuInfoText${tempCount}">
							<p>
								1회 제공량 (${result[tempCount].menu_amount})<br>
								칼로리 (${result[tempCount].menu_cal})<br>
								당류 (${result[tempCount].menu_sugar})<br>
								단백질 (${result[tempCount].menu_protein})<br>
								포화지방 (${result[tempCount].menu_fat})<br>
								나트륨 (${result[tempCount].menu_salt})
							</p>
						</div>
						<i id="menuInfoIcon${tempCount}" class="xi-zoom-in"></i>
						<p class="menuText${tempCount}">` + result[resultCountB].menu_id + '<br>' + menuPriceChangeValue(result[resultCountB].menu_price) + `원</p>
					</div>`;
					resultCountB++;
					tempCount++;
				}
				tempB += '</div>';
				if(resultCountB > 17){
					break;
				}
			}
			//coffee 19-30
			let tempC = '';
			let resultCountC = 18;
			for(let i=0; i<3; i++){
				tempC += `<div class="menuItemBox menuItemBoxC${i}" id="menuItemBoxC${i}">`;
				for(let j=0; j<4; j++){
					if(resultCountC > 29){
						break;
					}
					tempC +=
					`<div class="menuItem menuItem`+ tempCount +`">
						<img class="menuImage`+ tempCount +`" id="`+ tempCount +`" src="`+ result[resultCountC].image + `" alt="` + result[resultCountC].menu_id + `">
						<div class="menuInfoText${tempCount}">
							<p>
								1회 제공량 (${result[tempCount].menu_amount})<br>
								칼로리 (${result[tempCount].menu_cal})<br>
								당류 (${result[tempCount].menu_sugar})<br>
								단백질 (${result[tempCount].menu_protein})<br>
								포화지방 (${result[tempCount].menu_fat})<br>
								나트륨 (${result[tempCount].menu_salt})<br>
								카페인 (${result[tempCount].menu_caffeine})
							</p>
						</div>
						<i id="menuInfoIcon${tempCount}" class="xi-zoom-in"></i>
						<p class="menuText${tempCount}">` + result[resultCountC].menu_id + '<br>' + menuPriceChangeValue(result[resultCountC].menu_price) + `원</p>
					</div>`;
					resultCountC++;
					tempCount++;
				}
				tempC += '</div>';
				if(resultCountC > 29){
					break;
				}
			}
			//coffee 30
			let tempC_1 = '';
			let resultCountC_1 = 30;
			for(let i=0; i<3; i++){
				tempC_1 += `<div class="menuItemBox menuItemBoxC_1${i}" id="menuItemBoxC_1${i}">`;
				for(let j=0; j<4; j++){
					if(resultCountC_1 > 30){
						break;
					}
					tempC_1 +=
					`<div class="menuItem menuItem`+ tempCount +`">
						<img class="menuImage`+ tempCount +`" id="`+ tempCount +`" src="`+ result[resultCountC_1].image + `" alt="` + result[resultCountC_1].menu_id + `">
						<div class="menuInfoText${tempCount}">
							<p>
								1회 제공량 (${result[tempCount].menu_amount})<br>
								칼로리 (${result[tempCount].menu_cal})<br>
								당류 (${result[tempCount].menu_sugar})<br>
								단백질 (${result[tempCount].menu_protein})<br>
								포화지방 (${result[tempCount].menu_fat})<br>
								나트륨 (${result[tempCount].menu_salt})<br>
								카페인 (${result[tempCount].menu_caffeine})
							</p>
						</div>
						<i id="menuInfoIcon${tempCount}" class="xi-zoom-in"></i>
						<p class="menuText${tempCount}">` + result[resultCountC_1].menu_id + '<br>' + menuPriceChangeValue(result[resultCountC_1].menu_price) + `원</p>
					</div>`;
					resultCountC_1++;
					tempCount++;
				}
				tempC_1 += '</div>';
				if(resultCountC_1 > 30){
					break;
				}
			}
			//dessert 32-43
			let tempD = '';
			let resultCountD = 31;
			for(let i=0; i<3; i++){
				tempD += `<div class="menuItemBox menuItemBoxD${i}" id="menuItemBoxD${i}">`;
				for(let j=0; j<4; j++){
					if(resultCountC > 42){
						break;
					}
					tempD +=
					`<div class="menuItem menuItem`+ tempCount +`">
						<img class="menuImage`+ tempCount +`" id="`+ tempCount +`" src="`+ result[resultCountD].image + `" alt="` + result[resultCountD].menu_id + `">
						<div class="menuInfoText${tempCount}">
							<p>
								1회 제공량 (${result[tempCount].menu_amount})<br>
								칼로리 (${result[tempCount].menu_cal})<br>
								당류 (${result[tempCount].menu_sugar})<br>
								단백질 (${result[tempCount].menu_protein})<br>
								포화지방 (${result[tempCount].menu_fat})<br>
								나트륨 (${result[tempCount].menu_salt})
							</p>
						</div>
						<i id="menuInfoIcon${tempCount}" class="xi-zoom-in"></i>
						<p class="menuText${tempCount}">` + result[resultCountD].menu_id + '<br>' + menuPriceChangeValue(result[resultCountD].menu_price) + `원</p>
					</div>`;
					resultCountD++;
					tempCount++;
				}
				tempD += '</div>';
				if(resultCountD > 42){
					break;
				}
			}
			//topping 44-50


			//menu_id
			let tempMenuId = '';
			let sqlMenuId = [];
			for(let i=0; i<result.length; i++){
				tempMenuId = result[i].menu_id;
				sqlMenuId.push(tempMenuId);
			}
			//menu_price
			let tempMenuPrice = '';
			let sqlMenuPrice = [];
			for(let i=0; i<result.length; i++){
				tempMenuPrice = result[i].menu_price;
				sqlMenuPrice.push(tempMenuPrice);
			}
			//menu_amount
			let tempMenuAmount = '';
			let sqlMenuAmount = [];
			for(let i=0; i<result.length; i++){
				tempMenuAmount = result[i].menu_amount;
				sqlMenuAmount.push(tempMenuAmount);
			}
			//menu_cal
			let tempMenuCal = '';
			let sqlMenuCal = [];
			for(let i=0; i<result.length; i++){
				tempMenuCal = result[i].menu_cal;
				sqlMenuCal.push(tempMenuCal);
			}
			//menu_sugar
			let tempMenuSugar = '';
			let sqlMenuSugar = [];
			for(let i=0; i<result.length; i++){
				tempMenuSugar = result[i].menu_sugar;
				sqlMenuSugar.push(tempMenuSugar);
			}
			//menu_protein
			let tempMenuProtein = '';
			let sqlMenuProtein = [];
			for(let i=0; i<result.length; i++){
				tempMenuProtein = result[i].menu_protein;
				sqlMenuProtein.push(tempMenuProtein);
			}
			//menu_fat
			let tempMenuFat = '';
			let sqlMenuFat = [];
			for(let i=0; i<result.length; i++){
				tempMenuFat = result[i].menu_fat;
				sqlMenuFat.push(tempMenuFat);
			}
			//menu_salt
			let tempMenuSalt = '';
			let sqlMenuSalt = [];
			for(let i=0; i<result.length; i++){
				tempMenuSalt = result[i].menu_salt;
				sqlMenuSalt.push(tempMenuSalt);
			}
			//menu_caffeine
			let tempMenuCaffeine = '';
			let sqlMenuCaffeine = [];
			for(let i=0; i<result.length; i++){
				tempMenuCaffeine = result[i].menu_caffeine;
				sqlMenuCaffeine.push(tempMenuCaffeine);
			}
    		res.render('index',{ recommendationMenu : tempA, icecreamGreekyogurt : tempB, coffee : tempC, coffee_1 : tempC_1, dessert : tempD, menuId : sqlMenuId, menuPrice : sqlMenuPrice, menuAmount : sqlMenuAmount, menuCal : sqlMenuCal, menuSugar : sqlMenuSugar, menuProtein : sqlMenuProtein, menuFat : sqlMenuFat, menuSalt : sqlMenuSalt, menuCaffeine : sqlMenuCaffeine});
		});
	});
});

//회원등록
app.post('/point',(req,res)=>{
	let tempPhoneNum = req.body.pointNumComBtn;
	let phoneNum = tempPhoneNum.toString();

	let sql = `SELECT point FROM Members WHERE mobile = ${phoneNum}`;
	con.query(sql,(err, result, fields)=>{
		if(err) throw err;
		if (result[0]) {
			res.json( { mobile : result[0].point } );
			console.log(`${phoneNum} -----> 이미 등록된 번호 입니다. point는`, result);
    	} else {
			let sql = `INSERT INTO Members(mobile, point) VALUES ('${phoneNum}', 2000)`;
			con.query(sql, function(err, result,fields) {
				if (err) throw err;
				sql = `SELECT point FROM Members WHERE mobile = ${phoneNum}`;
 			 	con.query(sql,(err,result,fields)=>{
 					if(err) throw err;
 					res.json( { mobile : result[0].point } );
 			 	});
			});
			console.log(`입력완료 : ${phoneNum}`);
		}
	})
})
//resultPriceValue
//포인트 사용 후 DB수정
app.post('/afterUsePoint', function(req, res) {
	let savePoint = req.body.savePoint;
	let mobile = req.body.mobile;
	let resultPriceTotalValue = req.body.resultPriceTotalValue;
 	let sql = `UPDATE Members SET point = ${savePoint}, totalPrice = ${resultPriceTotalValue}  WHERE mobile = "${mobile}"`;
	let realTimeValue = req.body.realTimeValue;
 	con.query(sql, function(err, result) {
 		if(err) throw err;
		let sql = `INSERT INTO admin VALUES ('${realTimeValue}','${mobile}',${resultPriceTotalValue})`;
		con.query(sql,(err, result)=>{
			if(err) throw err;
		});
 	})
});

//관리자페이지
app.get('/adminPage',(req,res)=>{
	let inputPass = '1234';
	if (inputPass == '1234') {
		let nowDate = new Date();
		let sql  = `SELECT FORMAT(SUM(totalPrice),0) AS totalPrice FROM admin`;
		con.query(sql,(err,rows,fields)=>{
			let sql = `SELECT DATE_FORMAT(Date, '%Y-%m-%d %T') AS Date, mobile, totalPrice FROM admin WHERE YEAR(Date) = ${nowDate.getFullYear()} AND MONTH(Date) = ${nowDate.getMonth()+1} ORDER BY date DESC`;
			let [totalPrice] = rows;
			console.log(sql);
			con.query(sql,(err,rows,fields)=>{
				console.log(rows);
				res.render('admin',{ monthRow : rows, totalPrice : totalPrice});
			});
		});
	} 
});

//회원정보 입력 후 뒤로가기시 테이블에서 삭제
app.post('/deleteUser',(req,res)=>{
	let tempPhoneNumBack = req.body.tempPhoneNumBack;
	let sql = `DELETE FROM Members WHERE mobile = ${tempPhoneNumBack} AND point = 2000`;
	con.query(sql, (err, result)=>{
			if(err) throw err;
			console.log(result);
	})
})

app.listen(4113,()=>{
    console.log("START 4113 PORT!!");
});
