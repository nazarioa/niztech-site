/**
 * @file - This is an implementation for eWinery shopping carts.
 * @Version - 1.1
 *
 * For complete instructions visit the README.md
 *
 * In order to use this script:
 * 1) Include this script in your head tag
 * 2) Add the following tag in your html
 *     <div id="cart"></div>
 * 3) Set the COOKIE_DOMAIN variable in this script
 * 4) Add the following for each product on your page
 * where (productid) is the unique product ID found in eWinery -- no parenthisis.
 *     <span class="ewinery ewprice">(productid)</span>
 *     <span class="ewinery ewbutton">(productid)</span>
 *
 * @author - Nazario A. Ayala (niztech.com)
 * @date   - January 9, 2013
 **/

(function($) {
    "use strict";

    //--General Settings--//
    var DEBUG = true; //set to true for debugging. If true, IE may not render correctly.

    //-- eWinery Product Feeds --//
    // example: testFeedURL = '//store.cambriawines.com/ewinerysolutionsproductfeed?format=JSON&callback=?';
    var devFeedURL     = 'sampledata.js?format=JSON&callback=?';
    var testFeedURL    = 'sampledata.js?format=JSON&callback=?';
    var prodFeedURL    = 'sampledata.js?format=JSON&callback=?';

    //-- eWinery Store Address --//
    // example: prodEwineryStoreURL = 'http://store.cambriawines.com';
    var devEwineryStoreURL = 'http://www.niztech.com/content/ewinery/store.html';
    var testEwineryStoreURL = 'http://www.niztech.com/content/ewinery/store.html';
    var prodEwineryStoreURL = 'http://www.niztech.com/content/ewinery/store.html';

    //-- Your Websites URL --//
    // DO NOT include protocol
    // example: prodURL = 'www.cambriawines.com';
    var devURL = 'www.niztech.com';
    var prodURL = 'www.niztech.com';
    var stageURL = 'www.niztech.com';

    //-- COOKIE_DOMAIN --//
    // Should be the top level domain of your site
    var COOKIE_DOMAIN = ".niztech.com";
    /** advanced settings **/
    /* these probably don't need to change */
    var COOKIE_CART_NAME = 'CARTPRODUCTS';
    var COOKIE_CARTTOTAL = 'CARTTOTAL';
    var DOCUMENT_DOMAIN = COOKIE_DOMAIN;

    /** Probably don't need to go below this **/
    $.cookie.raw = false; // setting this to false encodes the cookie. This is how ewinery expects the data.
    var productData = Object();
    var cartCookieData = Array();
    var scriptPath = null;
    var eWineryFeedURL = null;
    var eWineryStoreURL = null;
    var cookie_options = {
        "expires": 1,
        "path": '/',
        "domain" : COOKIE_DOMAIN
    }

    $(document).ready(function() {
        /**
         * Calculate some variables needed by the script
         */
         if($('#ewineryscript') == null){
         	alert('eWinery is not setup correctly. Please include \' id = "ewineryscript"\' to the ewinery <script></script> tag .');
         } else {
         	scriptPath = $('#ewineryscript').last().attr("src").split('?')[0].split('/').slice(0, -1).join('/')+'/'; //get path of script
         }

        if (window.location.hostname == stageURL) {
            eWineryFeedURL = testFeedURL;
            eWineryStoreURL = testEwineryStoreURL;
        } else if(window.location.hostname == devURL){
            eWineryFeedURL = devFeedURL;
            eWineryStoreURL = devEwineryStoreURL;
        }else{
            eWineryFeedURL = prodFeedURL;
            eWineryStoreURL = prodEwineryStoreURL;
        }

        (DEBUG == true) ? console.log("eWinery: scriptPath: " + scriptPath) : false;
        (DEBUG == true) ? console.log("eWinery: using eWineryFeedURL: " + eWineryFeedURL) : false;
        (DEBUG == true) ? console.log("eWinery: using eWineryStoreURL: " + eWineryStoreURL) : false;

        /**
         * The following lines just deposit the rest of the cart code structure on the page.
         * This just keeps the HTML side a bit cleaner.
         */
        var cart = '<div id="mini-cart" style="display: block;">';
        cart += '<a id="cart-toggle" class="museo" href="#">&nbsp;</a>';
        cart += '<div>Items: <span class="total-item-count">0</span></div><div>Subtotal: <span class="sub-total">$0.00</span><div class="checkout-wrap"><a class="checkout" href="' + eWineryStoreURL + '/index.cfm?method=storecart.showcart" >Checkout</a></div></div>';
        cart += '</div>';
        cart += '<div id="cart-content" style="display: none;">';
        cart += '<ul>';
        cart += '</ul>';
        cart += '<!-- ';
        cart += '<div class="checkout-wrap">';
        cart += '<a class="checkout" href="' + eWineryStoreURL + '/index.cfm?method=storecart.showcart">Checkout</a>';
        cart += '</div>';
        cart += '-->';
        cart += '</div>';

        $('#cart').append(cart);

        /**
         * Initiates the eWinery connection.
         */
        startEwinery();
    });

    /**
     * Kicks off eWinery script. Calls eWinery data.
     */

    function startEwinery() {
        (DEBUG == true) ? console.log("eWinery: startEwinery()") : false;

        // Wont execute the render and attach functions until data is ready
        getEwineryData().done(function(data) {
            renderProductInfo();
            attachButtonsToClick();
        });

        getCookieCartSubTotal();
        getCookieCartProducts();
        showHideMiniCart('show');
        renderMiniCart();
    }

    /**
     * Gets data from ewinery via JSON and stores it in a variable
     * that is persistent throughout the visitor's browser's window session.
     */
    function getEwineryData() {
        //gets data from ewinery
        (DEBUG == true) ? ("eWinery: getEwineryData()") : false;

        var numberProducts;
        return $.getJSON(eWineryFeedURL, function(data) {
            $.each(data.products, function(i, products) {
                if (i == "ROWCOUNT") numberProducts = products;
                if (i == "DATA") {
                    for (var k = 0; k < numberProducts; k++) {

                        var productId = products["PRODUCTID"][k];
                        productData[productId] = {
                            "QUANTITY": "1",
                            "PRODUCTID": productId,
                            "ISCASE": "0",
                            "PRODUCTPRICEID": "",
                            "TYPE": products["TYPE"][k],
                            "PRODUCTSKU": products["PRODUCTSKU"][k],
                            "PRODUCTNAME": products["PRODUCTNAME"][k],
                            "PRICE1": products["PRICE1"][k],
                            "INVENTORY": products["INVENTORY"][k]
                        }
                    }
                }
            });
        });
    }


    /**
     * Populates the information into the UI #cart element that the user sees.
     */
    function renderMiniCart() {
        // render cookie contents into cart
        (DEBUG == true) ? ("eWinery: renderMiniCart()") : false;
        var itemsCount = getNumberItemsInCart();
        $("#cart-content ul").empty();
        $("#cart-content p.total span.count").text(cartCookieData.length + ' items in cart');
        if (itemsCount != 0) {
            $.each(cartCookieData, function(pr) {
                var prID = cartCookieData[pr].PRODUCTID;

                if (productData[prID] && cartCookieData[pr].QUANTITY > 0) {
                    var price = cartCookieData[pr].QUANTITY * cartCookieData[pr].PRICE1;
                    var i = '<li id="item-' + prID + '" class="item-row">';
                    i += '<p><span class="product-name">' + productData[prID].PRODUCTNAME + '</span><a href="#' + prID + '" class="remove">&nbsp;</a></p>';
                    i += '<p>Price: <span class="product-price">$' + parseFloat(cartCookieData[pr].PRICE).toFixed(2) + '</span></p>';
                    i += '<div>Qty: <span class="product-qty">' + cartCookieData[pr].QUANTITY + '</span></div>';
                    i += '<div>$<span class="product-qty-time-price">' + parseFloat(cartCookieData[pr].PRICE * cartCookieData[pr].QUANTITY).toFixed(2) + '</span></div>';
                    i += '</li>';

                    $("#cart-content ul").append(i);
                }
            });
        }

        $('#cart-content ul').append('<li id="total-line"><div><span class="total-item-count"></span> items in cart</div><div>Subtotal: <span class="sub-total"></span></div></li>');
        $('.sub-total').html("$" + getSubTotal().toFixed(2));
        $('.total-item-count').html(itemsCount);
    }

    /**
     * Deposits price and button for each item on the site.
     */
    function renderProductInfo() {
        (DEBUG == true) ? console.log("eWinery: Entering renderProductInfo()") : false;

        // ewinery ewbutton /////////////////////
        $.each($('.ewinery.ewbutton'), function populateProductBuyButton() {
            var buyButtonId = $(this).html();

            //(DEBUG == true) ? console.log("eWinery: populateProductBuyButton called gave " + $(this).html() ) : false;
            if (productData[buyButtonId] != null) {
                //(DEBUG == true) ? console.log('eWinery: product: ' + $(this).html() + ' has: ' + productData[$(this).html()].INVENTORY + ' items in inventory ' ) : false;
                if (Number(productData[buyButtonId].INVENTORY > 0)) {
                    // in stock
                    (DEBUG == true) ? console.log('(Warning) eWinery: wine out of stock: ' + buyButtonId) : false;
                    $(this).replaceWith('<span id=' + productData[buyButtonId].PRODUCTID + ' class="ewinery buynow"><img src="' + scriptPath + 'img/buy-now.png"" /></span>');
                } else {
                    // out of stock
                    (DEBUG == true) ? console.log('(Warning) eWinery: wine out of stock: ' + buyButtonId) : false;
                    $(this).replaceWith('<span class="ewinery soldout"><img src="' + scriptPath + 'img/sold-out.png"" /></span>');
                }
            } else {
                (DEBUG == true) ? console.log('(Warning) eWinery: No wine information found for: ' + buyButtonId) : false;
                $(this).replaceWith('<span class="ewinery noinfo"><img src="' + scriptPath + 'img/sold-out.png"" /></span>');
            }
        });

        // ewinery price ///////////////////////
        $.each($('.ewinery.ewprice'), function populateProductPrice() {
            var productPriceId = $(this).html();
            //(DEBUG == true) ? console.log("eWinery: called populateProductPrice retuned: " + $(this).html() ) : false;
            if (productData[productPriceId] != null) {
                $(this).replaceWith("Price: $" + parseFloat(productData[productPriceId].PRICE1).toFixed(2));
            } else {
                $(this).replaceWith("");
            }
        });
    }

    /**
     * add to cart and
     */
    function attachButtonsToClick() {
        (DEBUG == true) ? console.log("eWinery: Entering attachButtonsToClick()") : false;

        // add to cart
        $('.ewinery.buynow').click(function() {
            addItem($(this).attr('id'));
        });


        // remove from mini-cart
        $("#cart a.remove").live('click', function() {
            var productId = $(this).attr('href').replace('#', '');
            var productLIId = "#item-" + $(this).attr('href').replace('#', '');

            $(productLIId).animate({
                'opacity': '0'
            }, 200).slideUp('fast', function() {
                $(this).remove();
            });

            removeItem(productId, 1);
        });

        $('#cart-toggle').click(function() {
            toggleLittleCart();
        });
    }

    function removeItem(clickedProductId, numberToRemove) {
        (DEBUG == true) ? console.log("eWinery: removeItem()") : false;
        numberToRemove = typeof numberToRemove !== 'number' ? 1 : numberToRemove;

        for (var rr = 0; rr < cartCookieData.length; rr++) {
            console.log('LOOP');
            if (cartCookieData[rr].PRODUCTID == clickedProductId) {
                if (cartCookieData[rr].QUANTITY > numberToRemove) {
                    var newQtyForThisProduct = Number(cartCookieData[rr].QUANTITY) - numberToRemove;
                    console.log('Old Total was: ' + Number(cartCookieData[rr].QUANTITY));
                    console.log('New Total is: ' + newQtyForThisProduct);
                    cartCookieData[rr].QUANTITY = newQtyForThisProduct;
                    (DEBUG == true) ? console.log("eWinery: removed '" + numberToRemove + "' items from: '" + clickedProductId + "'") : false;
                } else {
                    cartCookieData.splice(rr, 1);
                    (DEBUG == true) ? console.log("eWinery: removed item: '" + clickedProductId + "'") : false;
                }
            }
        }

        setCookieCartProducts();
        renderMiniCart();
    }

    function addItem(clickedProductId, numberToAdd) {
        (DEBUG == true) ? console.log("eWinery: clicked on: '" + clickedProductId + "'") : false;
        numberToAdd = typeof numberToAdd != 'number' ? 1 : numberToAdd;

        var price = null;
        var change = false;

        //existing item in cart
        for (var ii = 0; ii < cartCookieData.length; ii++) {
            if (cartCookieData[ii].PRODUCTID == clickedProductId) {
                price = parseFloat(productData[clickedProductId].PRICE1);
                (DEBUG == true) ? console.log("eWinery: adding '" + numberToAdd + "' items to an existing product: " + clickedProductId + " price1: " + price) : false;
                cartCookieData[ii].QUANTITY = parseInt(cartCookieData[ii].QUANTITY) + 1;
                change = true;
            }
        }

        //new item in cart
        if (change == false) {
            price = parseFloat(productData[clickedProductId].PRICE1);

            var newItem = {
                'QUANTITY': numberToAdd,
                'PRODUCTID': productData[clickedProductId].PRODUCTID,
                'ISCASE': productData[clickedProductId].ISCASE,
                'PRODUCTPRICEID': productData[clickedProductId].PRODUCTPRICEID,
                'TYPE': productData[clickedProductId].TYPE,
                'PRODUCTSKU': productData[clickedProductId].PRODUCTSKU,
                'PRICE': productData[clickedProductId].PRICE1
            }

            cartCookieData.push(newItem);
            (DEBUG == true) ? console.log("eWinery: adding '" + numberToAdd + "' items to a new product: " + clickedProductId + " price1: " + price) : false;
        }


        setCookieCartSubTotal(price, numberToAdd);
        setCookieCartProducts();

        scrollToTop();
        renderMiniCart();
        toggleLittleCart();
        setTimeout(function() {
            toggleLittleCart()
        }, 3000);
    }

    function getCookieCartProducts(arg) {
        arg = typeof arg !== 'undefined' ? arg : false;
        if ($.cookie(arg != 'reset' && COOKIE_CART_NAME) !== null) {
            cartCookieData = $.evalJSON($.cookie(COOKIE_CART_NAME));
            (DEBUG == true) ? console.log("eWinery: cookie contained:") : false;
            (DEBUG == true) ? console.log(cartCookieData) : false;
        } else {
            (DEBUG == true) ? console.log("eWinery: No cookie found: ") : false;
            //setCookieCartProducts();
        }
    }

    function setCookieCartProducts() {
        $.cookie(COOKIE_CART_NAME, null, {
            "expires": -1,
            "path": "/"
        });
        $.cookie(COOKIE_CART_NAME, $.toJSON(cartCookieData), cookie_options);
    }

    function getCookieCartSubTotal() {
        var cookieSubTotalValue = 0.00
        if (typeof(Number($.cookie(COOKIE_CARTTOTAL))) != 'number') {
            cookieSubTotalValue = Number($.cookie(COOKIE_CARTTOTAL));
        }
        return cookieSubTotalValue;
    }

    function setCookieCartSubTotal(productPrice, productQuantity) {
        $.cookie(COOKIE_CARTTOTAL, null, {
            "expires": -1,
            "path": "/"
        });
        $.cookie(COOKIE_CARTTOTAL, getSubTotal(), cookie_options);
    }

    function showHideMiniCart(arg) {
        arg = typeof arg !== 'undefined' ? arg : 'toogle';
        if ($('#mini-cart').length > 0) {
            switch (arg) {
            case 'show':
                $('#mini-cart').css('display', 'block');
                break;

            case 'hide':
                $('#mini-cart').css('display', 'none');
                break;

            case 'toogle':
            default:
                if ($('#mini-cart').css('display') == 'none') {
                    showHideMiniCart('show');
                } else if ($('#mini-cart').css('display') == 'block') {
                    showHideMiniCart('hide');
                }
                break;
            }
        }
    }

    function toggleLittleCart() {
        (DEBUG == true) ? console.log("eWinery: toggling little cart") : false;
        renderMiniCart();

        $("#cart-content").slideToggle('medium', function() {
            if ($("#cart-content").css(':visible')) {
                $("#checkout").find('a').animate({ marginRight: -64 });
            } else {
                $("#checkout").find('a').animate({ marginRight: 3 });
            }
        });
    }

    function scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    }

    function getNumberItemsInCart() {
        var itemsInCart = 0;
        $.each(cartCookieData, function(nu) {
            itemsInCart += Number(cartCookieData[nu].QUANTITY);
        });

        return itemsInCart;
    }

    function getSubTotal() {
        var subTotal = 0;
        $.each(cartCookieData, function(nu) {
            subTotal += Number(cartCookieData[nu].QUANTITY) * Number(cartCookieData[nu].PRICE);
        });

        return Number(subTotal);
    }

})(jQuery);
