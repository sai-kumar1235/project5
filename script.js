let cartIcon=document.querySelector('#cart-icon');
let cart=document.querySelector('#cartTab');
let closeCart=document.querySelector("#close-cart");
cartIcon.onclick=()=>{
    cart.classList.add('active');
};
closeCart.onclick=()=>{
    cart.classList.remove('active');
};
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}
function ready(){
    var removeCartButtons=document.getElementsByClassName('cart-remove');
    for(var i=0; i< removeCartButtons.length;i++){
        var button=removeCartButtons[i];
        button.addEventListener('click',removeCartItem);
    }

    var quantityInputs=document.getElementsByClassName('cart-quantity');
    for(var i=0; i< quantityInputs.length;i++){
        var input=quantityInputs[i];
        input.addEventListener('change',quantityChanged);
    }
    updateTotal();


    var addCart=document.getElementsByClassName("cartbutton");
    for(var i=0; i< addCart.length;i++){
        var button=addCart[i];
        button.addEventListener('click',addcartClicked);
    }
}

function removeCartItem(event){
    var buttonClicked= event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}

function addcartClicked(event){
    var button1=event.target;
    var shopProducts=button1.parentElement;
    var title=shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price=shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg=shopProducts.getElementsByClassName('product-img')[0].src;
    console.log(title,shopProducts,price);
    addProductToCart(title,price,productImg);
    updateTotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox=document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems=document.getElementsByClassName('cart-content')[0];
    var CartItemsNames=cartItems.getElementsByClassName('cart-product-title');
    for(var i=0;i<CartItemsNames.length;i++){
        if(CartItemsNames[i].innerText==title.toUpperCase()){
            alert('You have already added this item to your cart');
            console.log("HI");
            return;
        }
    }
    var cartBoxContent=`<img src="${productImg}" class="cart-img" alt="">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" name="" min="1" id="" value="1" class="cart-quantity">
                    </div>
                    <i class='bx bx-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click',removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change',quantityChanged);
}



function updateTotal(event){
    var cartContent=document.getElementsByClassName('cart-content')[0];
    var cartBoxes=cartContent.getElementsByClassName('cart-box');
    var total=0;
    for(var i=0; i<cartBoxes.length;i++){
        var cartBox=cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement=cartBox.getElementsByClassName('cart-quantity')[0];
        var price=parseFloat(priceElement.innerText.replace("$",""));
        var quantity=quantityElement.value;
        total+=price*quantity;
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName('total-price')[0].innerText='$'+total;
}