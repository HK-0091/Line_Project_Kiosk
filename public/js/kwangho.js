
//결제 후 잔여 포인트 

//숫자 값 천 단위로 바꾸기
function menuPriceChangeValue(value){
    let tempPriceValue = [];
    let tempPriceResultValue = [];
    let tempValueContent = `${value}`;
    for(let i=0; i<tempValueContent.length; i++){
        tempPriceValue[i] = tempValueContent[i];
    };
    for(let i=0; i<tempValueContent.length; i++){
        if(i%3 ==0 && i!=0){
            tempPriceResultValue.unshift(",");
        };
        tempPriceResultValue.unshift(tempPriceValue.pop());
    };
    let resultValue = tempPriceResultValue.join("");
    return resultValue;
};

$(this).click((e)=>{
    if(e.target.className == 'usePointcomBtn'){
        $('.resultPointGuideNumber').html(menuPriceChangeValue(pointValueJson-usePointTempArrayJoin) + 'P');
    };
});

//-ajax(2) 포인트 사용 후 DB재 설정
//포인트 추가 *0.01 넣기
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
	    let realTimeValue = `${orderDate.getFullYear()}-${orderDate.getMonth()+1}-${orderDate.getDate()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`;
        if($('#inPhoneNum').val()){
            $('#savePointGuide').html(`적립 포인트: ${changePriceBtn(plusPoint)} P<br>보유 포인트: ${changePriceBtn(savePoint)} P`);
        }else{
            $('#savePointGuide').html("회원가입을 통해 포인트를 추가해 보세요!");
        };
        $.ajax({
            url : "/afterUsePoint",
            type : "POST",
            dataType : "JSON",
            data : { "savePoint" : savePoint, "mobile" : mobile, "resultPriceTotalValue" : resultPriceValue, "realTimeValue" : realTimeValue }
        })
        .done((json)=>{
            console.log(json);
        })
        .fail((xhr, status, errorThrown)=>{
            console.log("Ajax failed");
        });
    };
});

//-ajax(3) 회원정보 입력 후 뒤로가기시
$(".usePointbackBtn").click(()=>{
    let tempPhoneNumBack = $('#inPhoneNum').val();
   $.ajax({
    url : "/deleteUser",
    type : "POST",
    dataType : "JSON",
    data : { "tempPhoneNumBack" : tempPhoneNumBack }
   })
   .done((json)=>{

   })
   .fail((xhr, status, errorThrown)=>{
        console.log("Ajax failed");
   });
});

//menuCart Class
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
                    <div class="menuPrice" id="menuPrice${this.number}">${changePriceBtn(this.price * this.count)}</div>
                    <button class="menuPMD menuDelete" id="menuDelete${this.number}"><i class="xi-close" id="deleteIcon${this.number}"></i></button>
                </div>`;
    };
    set basketData(value){
        this.count = this.count+value
    };
};

//객체 생성
let shoppingBasketArray = [];
for(let i=0; i<menuId.length; i++){
    shoppingBasketArray[i] = new shoppingBasket(menuId[i],menuPrice[i],i)
}
let tempShoppingBasketArray = [];

// image 클릭시
$(this).click((e)=>{
    let tempShoppingBasketString = '';
    for(let i=0; i<menuId.length; i++){
        if(e.target.className == `menuImage${i}`){
            //중복된게 있으면 true를 반환해 1을 올리고 변수에 새로 받아 뿌리기

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
                    // 중복된 값이 아니라면 배열에 추가해 배열의 값을 변수에 새로 받아 뿌리기
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
            
// +버튼 클릭시
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

// -버튼 클릭시
$(this).click((e)=>{
    let tempShoppingBasketString = '';
    for(let i=0; i<menuId.length; i++){
        if(e.target.id == `menuMinusBtn${i}` || e.target.id == `minusIcon${i}`){
            if(tempShoppingBasketArray.includes(shoppingBasketArray[i])){
                //count가 1이면 그 밑으로 내려가지 않게함 
                if(shoppingBasketArray[i].count < 2){
                }else{
                    shoppingBasketArray[i].basketData = -1;
                    for(let i=0; i<tempShoppingBasketArray.length; i++){
                        tempShoppingBasketString += tempShoppingBasketArray[i].basketData;
                    }
                    $(`#menuCart`).html(tempShoppingBasketString);
                    totalPrice();
                    cartAmountPoint();
                    break;
                }
            }else{
                console.log("- Btn error")
            };
        };
    };
});
           
// x 클릭시 삭제
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

//포인트 사용 여부 확인 창 총 결제금액
$(`.usePointcomBtn`).click(()=>{
    $(`#resultPointTotal`).val(changePriceBtn(totalPriceNum - usePointTempArrayJoin));
});




 //포인트 사용 후 결제 방법 선택 창 총 결제금액
$(this).click((e)=>{
    if(e.target.className == 'resultPointComBtn'){
        $(`#totalPayment`).html(changePriceBtn(totalPriceNum - usePointTempArrayJoin));
            $(`.resultTotalPayment`).html(changePriceBtn(totalPriceNum - usePointTempArrayJoin) + ` 원`);          
    };
});
/*
   //(이미지 클릭시) 가격 천 단위로 변경
                function changePriceImage(e){
                    let menuPriceChangeArray = [];
                    let resultMenuPriceChangeArray = [];
                    let menuPriceChange = `${menuPrice[e.target.id]}`;
                    for(let i=0; i<menuPriceChange.length; i++){
                        menuPriceChangeArray[i] = menuPriceChange[i];
                    }
                    let tempMenuPriceChangeArray = menuPriceChangeArray.length;
                    for(let i=0; i<tempMenuPriceChangeArray; i++){
                        if(( i!=0 )&&(i%3 == 0)){
                            resultMenuPriceChangeArray.unshift(',');
                        }
                            resultMenuPriceChangeArray.unshift(menuPriceChangeArray.pop());
                    }
                    let resultMenuPriceChangeValue = resultMenuPriceChangeArray.join('');
                    return resultMenuPriceChangeValue
                }*/


                //(+,- 버튼 클릭시) 가격 천 단위로 변경
function changePriceBtn(value){
    let menuPriceChangeArray = [];
    let resultMenuPriceChangeArray = [];
    let menuPriceChange = `${value}`;
    for(let i=0; i<menuPriceChange.length; i++){
        menuPriceChangeArray[i] = menuPriceChange[i];
    };
    let tempMenuPriceChangeArray = menuPriceChangeArray.length;
    for(let i=0; i<tempMenuPriceChangeArray; i++){
        if(( i!=0 )&&(i%3 == 0)){
            resultMenuPriceChangeArray.unshift(',');
        };
        resultMenuPriceChangeArray.unshift(menuPriceChangeArray.pop());
    };
    let resultMenuPriceChangeValue = resultMenuPriceChangeArray.join('');
    return resultMenuPriceChangeValue
};


 //총 금액
                let totalPriceNum = 0;
                function totalPrice(){
                    totalPriceNum = 0;
                    let tempTotalPrice = 0;
                    for(let i=0; i<menuId.length; i++){
                        if($(`#menuPrice${i}`).html() != undefined ){
                            tempTotalPrice += (shoppingBasketArray[i].price)*(shoppingBasketArray[i].count)
                        };
                        totalPriceNum = tempTotalPrice;
                    }
                        $(`#menuTotalResultNumber`).html(changePriceBtn(totalPriceNum) + ' 원');
                        $(`#totalPayment`).html(changePriceBtn(totalPriceNum) + ' 원');
                        $(`.resultPointPay`).val(changePriceBtn(totalPriceNum));
                };
