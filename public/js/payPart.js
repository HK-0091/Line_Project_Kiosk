   
    /***********메뉴 돋보기 클릭 시 영양정보***********/

    $(this).on(`click`, (e) => {
        for( let i=0; i<menuId.length; i++) {
            if( e.target.id == `menuInfoIcon${i}`) {
                $(`#menuInfoIcon${i}`).stop().toggleClass(`xi-zoom-out`);
                $(`.menuInfoText${i}`).stop().slideToggle();
            }
        }
    });
    
    /***********토핑***********/
    $(this).on(`click`, (e) => {
        if( e.target.id == `toppingYes` || e.target.id == `toppingNo`) {
            $(`#toppingWrap`).css(`transform`, `translateY(163rem)`);
        };
    });

    /***********결제 취소하기 버튼 클릭 시 팝업***********/
    $(`#creditCardCancleBtn`).on(`click`, () => {
        $(`#payCanclePopup`).css(`display`,`block`);
        $(`#popupBg`).css(`display`, `block`);
    });

    $(`#samsungPayCancleBtn`).on(`click`, () => {
        $(`#payCanclePopup`).css(`display`,`block`);
        $(`#popupBg`).css(`display`, `block`);
    });

    /***********결제 취소 yes or no***********/
    $(this).on(`click`, (e) => {
        switch(e.target.id) {
            case `payCancleYes`:
                $(`#payCanclePopup`).css(`display`, `none`);
                $(`#popupBg`).css(`display`, `none`);
                $(`.payModal`).css(`transform`, `translateY(158rem)`);
                break;
            case `payCancleNo`:
                $(`#payCanclePopup`).css(`display`,`none`);
                $(`#popupBg`).css(`display`, `none`);
                break;
        };
    });

    /***********결제완료 버튼 클릭 시***********/
    $(this).on(`click`, (e) => {
        switch(e.target.id) {
            case `creditCardEndBtn`:
            $(`.payModal`).css(`transform`, `translateY(158rem)`);
            $(`#payEndWrap`).css(`display`, `block`);
            break;
            
            case `samsungPayEndBtn`:
            $(`.payModal`).css(`transform`, `translateY(158rem)`);
            $(`#payEndWrap`).css(`display`, `block`);
            break;
        };
    });

    /***********영수증, 대기번호 종료 카운팅***********/
    let setIntervalF = null;
    let closeWaitingNumCount = () => {
        let endCountingNum = $(`#waitingNumCount`).html();
        $(`#waitingNumCount`).html(--endCountingNum);
        if( $(`#waitingNumCount`).html() == 0 ) {
            clearInterval(setIntervalF);
            window.location.reload(); 
        };
    };

    /***********영수증 출력 yes or no***********/
    $(this).on(`click`, (e) => {
        switch(e.target.id) {
            case `payEndReceiptYes`:
                $(`.receiptPageBox`).css(`display`, `block`);
                // 영수증 값 대입하기
                // 상품 목록은 장바구니 완성하면 장바구니에서 가져오기
                let allOrderLists = ``; 
                let i=0;
                while(i<menuId.length) {
                    if( (/\d/).test($(`#menuCount${i}`).html()) ) {
                        
                        let eachOrderList = `
                        <p id="receiptOrderName" class="receiptBasicText">${$(`.menuName${i}`).html()}</p>
                        <p id="receiptOrderCount" class="receiptBasicText">${$(`#menuCount${i}`).html()}</p>
                        <p id="receiptOrderPrice" class="receiptBasicText">${$(`#menuPrice${i}`).html()}</p>`;
                            
                        allOrderLists += eachOrderList;
                        $(`.orderList`).html(allOrderLists);
                    };
                    i++;
                };
                
                $(`.taxableAmount`).html( changePriceBtn(totalPriceNum-(totalPriceNum*0.1))+ ` 원` );
                $(`.vatBox`).html( changePriceBtn(totalPriceNum*0.1)+ ` 원` );
                $(`.totalPrice`).html( changePriceBtn(totalPriceNum - usePointTempArrayJoin)+ ` 원` );
                $(`.creditCardPrice`).html( changePriceBtn(totalPriceNum - usePointTempArrayJoin)+ ` 원` );

                if( !(/\d/).test(usePointTempArrayJoin) && usePointTempArray != [] ) { 
                    $(`.pointPayment`).html(`0 P`);
                    $(`.remainingPoints`).html(`0 P`);
                } else {
                    $(`.pointPayment`).html( changePriceBtn(usePointTempArrayJoin) + ` P` );
                    $(`.remainingPoints`).html( changePriceBtn(savePoint) + ` P`);
                };
                
                break;
            case `payEndReceiptNo`:
                $(`#waitingNumPopup`).css(`display`, `block`);
                $(`#popupBg`).css(`display`, `block`);
                setIntervalF = setInterval( `closeWaitingNumCount()`, 1000 );
                break;
        };
    });


    /***********홈 화면으로 클릭 시 홈화면으로 이동***********/
    $(`#goHomeBtn`).on(`click`, () => {
        window.location.reload();
    });



    /***********확인 버튼 클릭 시 잘못된 번호 알림 팝업 닫기***********/
    $(`#wrongPhoneNumBtn`).on(`click`, () => {
        $(`#wrongPhoneNum`).css(`display`, `none`);
        $(`#popupBg`).css(`display`, `none`);

    });
   
// 장바구니 담긴 수만큼 빨간 동그라미 숫자 증가
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




