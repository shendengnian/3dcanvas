window.onload=function(){CanvasParticle({vx:4,vy:4,height:2,width:2,count:200,color:"121, 162, 185",stroke:"130,255,255",dist:6e3,e_dist:2e4,max_conn:10})},$(function(){$(window).scroll(function(){100<=$(window).scrollTop()?$(".actGotop").fadeIn(300):$(".actGotop").fadeOut(300)}),$(".actGotop").click(function(){$("html,body").animate({scrollTop:"0px"},800)})});var datas=[{use:"134567455",code:"总经理",name:"拥有者",states:"22种",date:"已加入"},{use:"145634552",code:"运营经理",name:"成员",states:"12种",date:"已加入"}],vuedata=new Vue({el:"#vueApp",data:{checkAll:!1,checkedRows:[],facilities:datas,newRow:{}},methods:{addRow:function(){this.facilities.push(this.newRow),this.newRow={}},saveRows:function(){console.log("查看数据")},delRows:function(){if(this.checkedRows.length<=0)return alert("请选择需要移除的人员"),!1;if(!confirm("确定要从企业移除该"+datas[0]+"吗？"))return!1;alert("移除成功！");for(var t=0;t<this.checkedRows.length;t++){var e=this.checkedRows[t];this.facilities=$.grep(this.facilities,function(t,o){return o!=e})}this.checkedRows=[]}}}),logo_getout=document.getElementById("logo_getout");logo_getout.onclick=function(){confirm("是否退出该账号？")&&(window.location="logo.html")};