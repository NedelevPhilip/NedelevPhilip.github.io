$( document ).ready(function() {


    /////////////////////////////////////////////
    var plans = [
        {
            price: 3.4,
            checked: true,
            name: "2 Day Value",
            descr: "per parcel up to 1kg"
        },
        {
            price: 6,
            checked: false,
            name: "2-3 Day Tracked",
            descr: "per parcel up to 15kg"
        }
    ];
    var palletPrice = 16.9;
    var firstItemInOrder = 0.9;
    var otherItemsInOrder = 0.25;
    ///////////////////////////////////////////







    var ordersMonth = $('#orders-month');
    var ordersMonthVal = $('#orders-month-val');
    var averageOrder = $('#average-order');
    var averageOrderVal = $('#average-order-val');
    var space = $('#space');
    var spaceVal = $('#space-val');

    var cost = 0;
    var pickPackOrder = 0;
    var pickPackMonth = 0;
    var store = 0;
    var send = 0;
    var total = 0;

    function setValues(){
        ordersMonthVal.text(ordersMonth.val());
        averageOrderVal.text(averageOrder.val());
        spaceVal.text(space.val());

        $('#pipkpack').text('£' + parseFloat(pickPackOrder.toFixed(2)));
        $('#store').text('£' + parseFloat(store.toFixed(2)));
        $('#send').text('£' +  parseFloat(send.toFixed(2)));
        $('#total').text('£' +  parseFloat(total.toFixed(2)));
    }

    function calculate() {
        pickPackOrder = (averageOrder.val() - 1) * otherItemsInOrder + firstItemInOrder;
        pickPackMonth =  ordersMonth.val() * pickPackOrder;
        store = space.val() * palletPrice;
        send = cost * ordersMonth.val();
        total = pickPackMonth + store + send;
        setValues();
    }


    $('.section__estimate__input').change(function () {
        calculate();
    });

    function initPrices() {
        setValues();

        var parent = $('.section__estimate__plans-wrap');
        $.each(plans, function (i) {
            if(plans[i].checked){
                cost = plans[i].price;
            }

            var checked = plans[i].checked?"flex" : "none";

            parent.append('<div class="section__estimate__plan-item">' +
                '<h3 class="section__estimate__plan-title">' + plans[i].name + '</h3>'+
                '<div class="ection__estimate__plan-text"></div>'+
                '<div class="ection__estimate__plan-price">£' + plans[i].price + '</div>'+
                '<div class="ection__estimate__plan-text">' + plans[i].descr + '</div>'+
                '<div class="ection__estimate__plan-input-wrap">'+
                '<div data-index="' + i + '" id="radio-1" class="ection__estimate__plan-input">'+
                '<img style="display:' + checked + ';" class="ection__estimate__plan-input-icon" src="./img/iconmonstr-check-mark-1.png">'+
                '</div></div></div>');

                $("div[data-index = " + i + "]").click(function(e) {
                    if(!plans[i].checked){

                        $.each(plans, function (k) {
                            if(plans[k].checked){
                                plans[k].checked = false;
                                $("div[data-index = " + k + "]").children().css( "display", "none" );
                            }
                        });

                        plans[i].checked = true;
                        $("div[data-index = " + i + "]").children().css( "display", "flex" );

                        cost = plans[i].price;

                        calculate();
                    }
                });
        });
    }

    initPrices();
});
