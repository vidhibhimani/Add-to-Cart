

var shoppingCart = (function () {

    cart = [];

        function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
        }

  
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }



    
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCart'));
            }
            if (localStorage.getItem("shoppingCart") != null) {
            loadCart();
            }


    var obj = {};

    // Add to cart


    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }


      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
  


    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart


    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }

    // Remove Product


    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }




    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
            var totalCount = 0;
         for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }

    // Total cart


        obj.totalCart = function () {
        var totalCart = 0;
                  for (var item in cart) {
                          totalCart += cart[item].price * cart[item].count;
                 }
        return Number(totalCart.toFixed(2));
        }

    // List of PRocuts


    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }   
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();


  // Add Product

  $('.default-btn').click(function (event) {

 
    event.preventDefault();
        var name = $(this).data('name');
        var price = Number($(this).data('price'));

        shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

            // Clear Product
            $('.clear-cart').click(function () {
                shoppingCart.clearCart();
                displayCart();
            });


  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>"
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "</div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = "
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    // $('.total-cart').html(shoppingCart.totalcart());
    $('.total-count').html(shoppingCart.totalCount());
  }

  // Delete 

  $('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })

  // Count of Product
  $('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    // var count = Number($val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });


  displayCart();


