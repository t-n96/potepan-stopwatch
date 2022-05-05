/*global $*/
$(document).ready(function() {
let setTimeoutId = undefined;
 let startTime = 0;　//スタートボタン押した時の時刻
 let currentTime = 0; //現在の時刻
 let elapsedTime = 0; //経過時間
 
 function runTimer() {
   currentTime = Date.now();//現在の時間をミリ毎秒に返す
   showTime();
   setTimeoutId = setTimeout(() => {
     runTimer();
   },10)
 }
 
 function showTime() {
   //new Dateは指定した時刻を表示させるオブジェクト生成
   let d = new Date(currentTime - startTime + elapsedTime);
   const getHour = d.getUTCHours();
   const getMin = d.getMinutes();//分を0から59の整数で取得する
   const getSec = d.getSeconds();//秒を0から59の整数で取得する
   const getMillisec = Math.floor(d.getMilliseconds() / 10);//ミリ秒を0から999の整数で取得する
   
   $(".timer").text(`${String(getHour)}:${String(getMin)}:${String(getSec)}:${String(getMillisec).slice(0, 1)}`);
 }
 
 function classReplacementStart() {
   $(".btn-start").addClass("disabled");
   $(".btn-stop").removeClass("disabled");
   $(".btn-reset").removeClass("disabled");
 }
 
 function classReplacementStop() {
   $(".btn-start").removeClass("disabled");
   $(".btn-stop").addClass("disabled");
   $(".btn-reset").removeClass("disabled");
 }
 
 function classReplacementReset() {
   $(".btn-start").removeClass("disabled");
   $(".btn-stop").addClass("disabled");
   $(".btn-reset").addClass("disabled");
 }
 
 $(".btn-start").click(function() {
   if($(this).hasClass('disabled')) {
     return;
   }
   classReplacementStart() 
   startTime = Date.now();
   runTimer();
 });
 
 $(".btn-stop").click(function() {
   if($(this).hasClass('disabled')) {
     return;
   }
   classReplacementStop()
   elapsedTime += currentTime - startTime;
   clearTimeout(setTimeoutId);
 });
 
 $(".btn-reset").click(function() {
   if($(this).hasClass('disabled')) {
     return;
   }
   classReplacementReset()
   clearTimeout(setTimeoutId);
   elapsedTime = 0
   $(".timer").text("0:0:0:0");
   
 });
  
});

