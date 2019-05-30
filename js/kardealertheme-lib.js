jQuery(document).ready(function($){
  $('#nofeedback').click(function(evn){
      $("body").append('<div class="toast-message"><span style="display:none;" id="toastmessageouter" class=""><span id="toastmessage"></span></span></div>');
      var msg = "To release all theme power, please, increase the WordPress memory limit.";
      toastMessageAuto(msg, 'warning');
 });
  $('#nohelp').click(function(evn){
      $("body").append('<div class="toast-message"><span style="display:none;" id="toastmessageouter" class=""><span id="toastmessage"></span></span></div>');
      var msg = "To release all theme power, please, increase the WordPress memory limit.";
      toastMessageAuto(msg, 'warning');
 });
  $('#nosupport').click(function(evn){
      $("body").append('<div class="toast-message"><span style="display:none;" id="toastmessageouter" class=""><span id="toastmessage"></span></span></div>');
      var msg = "To release all theme power, please, increase the WordPress memory limit.";
      toastMessageAuto(msg, 'warning');
 });
    $("body").append('<div class="toast-message"><span style="display:none;" id="toastmessageouter" class=""><span id="toastmessage"></span></span></div>');
// var toastMessageAuto2 = function(message, opcao) {
function toastMessageAuto(message, opcao) {
    $("#toastmessageouter").attr("style", "display:none");
     // erro ...    $("#toastmessageouter").removeClass("success-toast").addClass("error-toast");
    // verde $("#toastmessageouter").removeClass("error-toast").addClass("success-toast");
    if(opcao === 'error')
    {
        $("#toastmessageouter").removeClass("success-toast").addClass("error-toast");
    }
    if(opcao === 'ok')
    {
        $("#toastmessageouter").removeClass("error-toast").addClass("success-toast");
    }
    if(opcao === 'warning')
    {
        $("#toastmessageouter").removeClass("error-toast").addClass("warning-toast");
        $("#toastmessage").css('color', 'black');
    }
    $("#toastmessage").text(message);
    $("#toastmessageouter").fadeIn(500);
    clearTimeout(timeout);
    var timeout = setTimeout(function(){
        $("#toastmessageouter").fadeOut(500);
    },4000);
 };
});// jquery