// $(function(){
//   // $('#content').on('click','.row>div:nth-child(8)',function(){
//   //     // alert(1)
//   //     $('#menu>.row>div:nth-last-child(-n+4)').toggle();
//   //     return false;
//   // })
//   getMenuStyle()
//   // getCategoryStyle()
// })
// // // menu数据的渲染
// function getMenuStyle(){
//   $.ajax({
//       url:'http://192.168.11.52:8080/ControlCenter/showprice/showprice/salecommodity?storeid=4',
//       success:function(data){
//           // console.log(data);
//           var html =template('menuTpl',data);
//           $("#menu>.row").html(html);
//       }
//   })
// }
// function getCategoryStyle(){
//   $.ajax({
//       url:url+'api/getmoneyctrl',
//       success:function(data){
//           // console.log(data)
//           var html = template('categoryTpl',data);
//           $('#category>.category_info').html(html);
//       }
//   })
// }
//定时器
// setInterval(function(){
//   var dt=new Date();
//   var hh=dt.getHours();
//   hh=hh<10?'0'+hh:hh;
//   var mm=dt.getMinutes();
//  mm= mm<10?'0'+mm:mm;
//   console.log(hh,mm)
//   if(hh<12){
//     console.log('11:11');
//   }else if(12<hh<18){
//    console.log('12:16');
//   }else{
//     console.log('24:00'+'06:00')
//   }
// },1
//var aa='http://123.57.217.145:8080'
