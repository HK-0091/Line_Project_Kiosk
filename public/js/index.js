//19
function showSlide() {
    for(let i=0; i<images.length; i++) {
      images[i].classList.remove('on');
    }
    current++;
    if(current > images.length) {
      current = 1;
    }
    images[current - 1].classList.add('on');
    setTimeout(showSlide, 2000);
}
showSlide();





//20
let menuWaitSetInterval = '';
let menuWaitSetTimeout = '';

function menuWait(){
    let menuWaitCount = 10;
    menuWaitSetTimeout =
        setTimeout(()=>{
            menuWaitSetInterval =
            setInterval(()=>{
                $('.menuWaitCount').html(menuWaitCount);
                $('.menuWaitBox').css('display','block');

                if(menuWaitCount == 0){
                    window.location.reload();
                }
                menuWaitCount--;
            },1000);
        },'90000');
}



//21
$(this).click(()=>{
    if($('.menuWaitBox').css('display') == "block"){
        $('.menuWaitBtn').click(()=>{
            $('.menuWaitBox').css('display','none');
            clearInterval(menuWaitSetInterval);
            clearTimeout(menuWaitSetTimeout);
            menuWait();
        });
    }else{
        clearInterval(menuWaitSetInterval);
        clearTimeout(menuWaitSetTimeout);
        menuWait();
    }
});


$(`#payEndReceiptNo`).on(`click`, () => {
    clearInterval(menuWaitSetInterval);
    clearTimeout(menuWaitSetTimeout);
});

$(`#payEndReceiptYes`).on(`click`, () => {
    clearInterval(menuWaitSetInterval);
    clearTimeout(menuWaitSetTimeout);
});



//22

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
            <img class="menuImage`+ tempCount +`" id="`+ tempCount +`" src="`+ 
            result[resultCount].image + `" alt="` + result[resultCount].menu_id + `">
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
            <p class="menuText${tempCount}">` + result[resultCount].menu_id + '<br>' + 
            menuPriceChangeValue(result[resultCount].menu_price) + `원</p>
        </div>`;
        resultCount++;
        tempCount++;
    }
    tempA += '</div>';
    if(resultCount > 5){
        break;
    }
}
//23

let cartAmountPoint = () => {
    let totalCartAmount = 0;
    for(let i=0; i<menuId.length; i++) {
        if( (/\d/).test(Number($(`#menuCount${i}`).html())) ) {
            let cartAmount = Number($(`#menuCount${i}`).html());
         
            totalCartAmount += cartAmount;
        };
        
        $(`#menuCartNum`).html(totalCartAmount);
    };
};

//24

class menuQueue {
    constructor(){
        this.queueArray = [];
    }
    pushDiv( itemValue ){
        this.queueArray.push( itemValue );
    }
    unshiftDiv( itemValue ){
        this.queueArray.unshift( itemValue );
    }
    popDiv(){
        return this.queueArray.pop();
    }
    shiftDiv(){
        return this.queueArray.shift();
    }
}
let menuSlideQueue = new menuQueue();

//25

$(".menuMenu3").click(()=>{
    menuSlideQueue.queueArray = [];
    function loadMenuC(){
        //-1번 배열
        menuSlideQueue.pushDiv(`!{coffee}`);
        //-2번 배열
        menuSlideQueue.pushDiv(`!{coffee_1}`);
        $('#menuMenuBox').html(menuSlideQueue.queueArray[0]);
    }
    loadMenuC();
    $("#menuMenu3").css('background-color','#0068b7');
    $("#menuMenu3").css('color','white');
});
//26

class shoppingBasket {
    constructor(name, price, number){
        this.name = name;
        this.count = 0;
        this.price = price;
        this.number = number;
    }
    get basketData(){
        return `<div class='menuSelectValues'>
                    <div class="menuName menuName${this.number}">${this.name}</div>
                    <button class="menuPMD" id="menuMinusBtn${this.number}">
                        <i class="xi-minus" id="minusIcon${this.number}"></i>
                    </button>
                    <div class="menuCount" id="menuCount${this.number}">${this.count}</div>
                    <button class="menuPMD" id="menuPlusBtn${this.number}">
                        <i class="xi-plus" id="plusIcon${this.number}"></i>
                    </button>
                    <div class="menuPrice" id="menuPrice${this.number}">
                    ${changePriceBtn(this.price * this.count)}</div>
                    <button class="menuPMD menuDelete" id="menuDelete${this.number}">
                    <i class="xi-close" id="deleteIcon${this.number}"></i></button>
                </div>`;
    };
    set basketData(value){
        this.count = this.count+value
    };
};
let shoppingBasketArray = [];
for(let i=0; i<menuId.length; i++){
    shoppingBasketArray[i] = new shoppingBasket(menuId[i],menuPrice[i],i)
}
//27

$(this).click((e)=>{
    let tempShoppingBasketString = '';
    for(let i=0; i<menuId.length; i++){
        if(e.target.id == `menuPlusBtn${i}` || e.target.id == `plusIcon${i}`){
            if(tempShoppingBasketArray.includes(shoppingBasketArray[i]) && shoppingBasketArray[i].count < 99 ){
                shoppingBasketArray[i].basketData = 1;
                for(let i=0; i<tempShoppingBasketArray.length; i++){
                    tempShoppingBasketString += tempShoppingBasketArray[i].basketData;
                }
                $(`#menuCart`).html(tempShoppingBasketString);
                totalPrice();
                cartAmountPoint();
                break;
            }else{
                console.log("+ Btn error")
            }
            
        }
    }
})
$(this).click((e)=>{
    let tempShoppingBasketString = '';
    for(let i=0; i<menuId.length; i++){
        if(e.target.id == `menuDelete${i}` || e.target.id == `deleteIcon${i}`){
            if(tempShoppingBasketArray.includes(shoppingBasketArray[i])){
                shoppingBasketArray[i].count = 0;
                tempShoppingBasketArray.splice(tempShoppingBasketArray.indexOf(shoppingBasketArray[i]),1);
                for(let i=0; i<tempShoppingBasketArray.length; i++){
                    tempShoppingBasketString += tempShoppingBasketArray[i].basketData;
                }
                $(`#menuCart`).html(tempShoppingBasketString);
                totalPrice();
                cartAmountPoint();
                break;
            }else{
                console.log(" delete error")
            };
            
        };
    };
});

//28

$(this).click((e)=>{
    let tempShoppingBasketString = '';
    for(let i=0; i<menuId.length; i++){
        if(e.target.className == `menuImage${i}`){
            //중복된게 있으면 true를 반환해 1을 올리고 변수에 새로 받아 보내기

            if( shoppingBasketArray[i].count < 99 ) {
                if(tempShoppingBasketArray.includes(shoppingBasketArray[i])) {
                    shoppingBasketArray[i].basketData = 1;
                    for(let i=0; i<tempShoppingBasketArray.length; i++){
                        tempShoppingBasketString += tempShoppingBasketArray[i].basketData;
                    }
                    $(`#menuCart`).html(tempShoppingBasketString);
                    totalPrice();
                    cartAmountPoint();
                    break;
                }else{
                    // 중복된 값이 아니라면 배열에 추가해 배열의 값을 변수에 새로 받아 보내기
                    shoppingBasketArray[i].basketData = 1;
                    tempShoppingBasketArray.push(shoppingBasketArray[i]);
                    for(let i=0; i<tempShoppingBasketArray.length; i++){
                        tempShoppingBasketString += tempShoppingBasketArray[i].basketData;
                    }
                    $(`#menuCart`).html(tempShoppingBasketString);
                    cartAmountPoint();
                    totalPrice();
                };
            };
        };
    };
});
//29

let inPhoneNumCheck= /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;

let pointValueJson = ""
$(this).click((e)=>{
    if(e.target.className == 'pointNumComBtn'){
        //조건 -> 휴대전화 정규식
        if( inPhoneNumCheck.test($('.inPhoneNum').val()) ) {
            $('.inPointModal').css('display', 'block');
            let pointNumComBtn = $('#inPhoneNum').val();
            $.ajax({
                url : "/point",
                type : "POST",
                dataType : "JSON",
                data : {"pointNumComBtn" : pointNumComBtn}
            })
            .done((json)=>{
                $('.nowPoint').val(changePriceBtn(json.mobile));
                pointValueJson = json.mobile;
                usePointTempArray = [];
                usePointTempArrayJoin = '';
                $('.usePointScreen').val(changePriceBtn(usePointTempArrayJoin));
            })
            .fail((xhr, status, errorThrown)=>{
                alert("Ajax failed");
            });
            $(`#inPointBoxTotalPrice`).html(`예상 결제 금액: ` + changePriceBtn(totalPriceNum) + ` 원`);
        } else {
            $(`#wrongPhoneNum`).css(`display`, `block`);
            $(`#popupBg`).css(`display`, `block`);
            inputPhoneNum = "";
            $("#inPhoneNum").val(inputPhoneNum);
        }
    };
});
//30

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
//31

app.post('/afterUsePoint', function(req, res) {
	let savePoint = req.body.savePoint;
	let mobile = req.body.mobile;
	let resultPriceTotalValue = req.body.resultPriceTotalValue;
 	let sql = `
                UPDATE Members SET point = ${savePoint}, 
                totalPrice = ${resultPriceTotalValue}  
                WHERE mobile = "${mobile}"
                `;
	let realTimeValue = req.body.realTimeValue;
 	con.query(sql, function(err, result) {
 		if(err) throw err;
		let sql = `INSERT INTO admin VALUES ('${realTimeValue}','${mobile}',${resultPriceTotalValue})`;
		con.query(sql,(err, result)=>{
			if(err) throw err;
		});
 	})
});
//32

let savePoint = 0;
$(this).click((e)=>{
    if(e.target.className == 'creditCardEndBtn' || e.target.className == 'samsungPayEndBtn'){

        //남은  포인트
        let remainPoint = pointValueJson-usePointTempArrayJoin;
        //총 결제금액 - 포인트 결과값
        let resultPriceValue = totalPriceNum - usePointTempArrayJoin;
        //추가 될 포인트
        let plusPoint = parseInt(resultPriceValue * 0.01);
        //포인트 추가 후 총 포인트
        savePoint = 0;
        savePoint = remainPoint + plusPoint;

        let mobile = $('#inPhoneNum').val();
    	let orderDate = new Date();
	    let realTimeValue = `${orderDate.getFullYear()}-${orderDate.getMonth()+1}-${orderDate.getDate()} 
        ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`;
        if($('#inPhoneNum').val()){
            $('#savePointGuide').html(`적립 포인트: ${changePriceBtn(plusPoint)} P<br>보유 포인트: 
            ${changePriceBtn(savePoint)} P`);
        }else{
            $('#savePointGuide').html("회원가입을 통해 포인트를 추가해 보세요!");
        };
        $.ajax({
            url : "/afterUsePoint",
            type : "POST",
            dataType : "JSON",
            data : { "savePoint" : savePoint, "mobile" : mobile, "resultPriceTotalValue" : resultPriceValue, 
            "realTimeValue" : realTimeValue }
        })
        .done((json)=>{
            console.log(json);
        })
        .fail((xhr, status, errorThrown)=>{
            console.log("Ajax failed");
        });
    };
});
//33

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

//34

//-menu_id
let menuIdTemp = `#{menuId}`;
let menuId = menuIdTemp.split(',');
//-menu_price
let menuPriceTemp = `#{menuPrice}`;
let menuPrice = menuPriceTemp.split(',');
//-menu_amount
let menuAmountTemp = `#{menuAmount}`;
let menuAmount = menuAmountTemp.split(',');
//-menu_cal
let menuCalTemp = `#{menuCal}`;
let menuCal = menuCalTemp.split(',');
//-menu_sugar
let menuSugarTemp = `#{menuSugar}`;
let menuSugar = menuSugarTemp.split(',');
//-menu_protein
let menuProteinTemp = `#{menuProtein}`;
let menuProtein = menuProteinTemp.split(',');
//-menu_fat
let menuFatTemp = `#{menuFat}`;
let menuFat = menuFatTemp.split(',');
//-menu_salt
let menuSaltTemp = `#{menuSalt}`;
let menuSalt = menuSaltTemp.split(',');
//-menu_caffeine
let menuCaffeineTemp = `#{menuCaffeine}`;
let menuCaffeine = menuCaffeineTemp.split(',');

//35

let printArea;
let initBody;

function printGo(printArea){
   window.onbeforeprint = beforePrint;
   window.onafterprint = afterPrint;
   window.print();
}
function beforePrint(){
   initBody = document.body.innerHTML;
   document.body.innerHTML = document.getElementById(`printArea`).innerHTML;
}
function afterPrint(){
   document.body.innerHTML = initBody;
}
function homePage(){
    window.location.reload();
}
function printX(){
    $(`.receiptPageBox`).css(`display`, 'none');
    $(`#waitingNumPopup`).css(`display`, 'block');
    $(`#popupBg`).css(`display`, `block`);
    setIntervalF = setInterval( `closeWaitingNumCount()`, 1000 );
}