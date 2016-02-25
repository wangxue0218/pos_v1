//TODO: Please write code in this file.
function printInventory(inputs){
  var allItems = loadAllItems();
  var cartItems = new Array();
  var newCartItems = new Array();
  var giftItems = new Array();
  var totalFactPrice=0;
  var totalProPrice=0;
  var promotions = loadPromotions();
  for(var i=0;i<inputs.length;i++){
    var count =0;
    if(inputs[i]!='true'){
      if(inputs[i].length>10){
        var tmp = inputs[i].substr(0,10);
        count = inputs[i].substr(11,1);
        inputs[i]=true;
      }
      else{
      var tmp = inputs[i];
      for(var j=0;j<inputs.length;j++){
        if(inputs[j]==tmp){
          count++;
          inputs[j]='true';
        }
      }
    }
      for(var r=0;r<allItems.length;r++){
        if(allItems[r].barcode!=tmp)
        continue;
        allItems[r].totalcount = count;
        cartItems.push(allItems[r]);
        //cartItems.push({'barcode':inputs[i],'name':allItems[r].name,'price':allItems[r].price,'totalcount':count});
      }
    }
  }
  console.log(cartItems);
  for(var m=0;m<cartItems.length;m++){
    var sumPrice = cartItems[m].price*cartItems[m].totalcount;
    var proCount = 0;
    for(var n=0;n<promotions[0].barcodes.length;n++){
      if(cartItems[m].barcode==promotions[0].barcodes[n]){
        proCount = 1;
        break;
      }
    }
    var factPrice = cartItems[m].price*(cartItems[m].totalcount-proCount);
    cartItems[m].factPrice = factPrice;
    cartItems[m].sumPrice = sumPrice;
    newCartItems.push(cartItems[m]);
    if(proCount!=0){
      giftItems.push({'name':cartItems[m].name,'proCount':proCount,'unit':cartItems[m].unit});
    }
  }
  console.log(newCartItems);
  console.log(giftItems);
  //计算总价和总折扣
  for(var i=0;i<newCartItems.length;i++){
    totalFactPrice += newCartItems[i].factPrice;
    totalProPrice += (newCartItems[i].sumPrice-newCartItems[i].factPrice);
  }
  console.log(totalProPrice);
  console.log(totalFactPrice);
  //得到viewmodel：newCartItems,giftItems,totalProPrice,totalFactPrice
  var result = '***<没钱赚商店>购物清单***';
  for(var i=0;i<newCartItems.length;i++){
    result += ('\n'+'名称：'+newCartItems[i].name+',数量：'+newCartItems[i].totalcount+newCartItems[i].unit+',单价：'+newCartItems[i].price+'(元)，小计：'+newCartItems[i].factPrice+'(元)');
  }
  result += '\n-----------------------\n挥泪赠送商品：';
  for(var i=0;i<giftItems.length;i++){
    result += ('\n'+'名称：'+giftItems[i].name+',数量：'+giftItems[i].proCount+giftItems[i].unit);
  }
  result += '\n-----------------------';
  result += '\n'+'总计：' + totalFactPrice + '(元)';
  result += '\n'+'节省：' + totalProPrice + '(元)';
  result += '\n************************';
  console.log(result);
}
