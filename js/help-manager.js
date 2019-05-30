jQuery(document).ready(function($){
    
  $('#kardealer_update_theme3').click(function(evn){

   // Cookie
   var d = new Date();
   d.setTime(d.getTime() + (1*60*60*1000));
   var expires = "expires="+ d.toUTCString();
   var dom = document.domain;
   
   if($('#kardealer_update_theme3').is(':checked'))
    { cval = '1';    }
   else
    { cval = '0';    }
     
   cvalue = cval+"-"+dom;   
   document.cookie = "bill_update_vm" + "=" + cvalue + ";" + expires + ";path=/";
   $('#kardealer-update-theme2').submit();

  });   
    
     $( "#kardealer-open-help" ).click(function() {
     $('.metabox-prefs').css('display', 'block');
     $('#contextual-help-wrap').css('display', 'block');
     $('#contextual-help-link').attr("aria-expanded","true");
     $('#contextual-help-link').addClass("screen-meta-active");
   });
     
   /* Support ----------*/
   
   $( "#kardealer-send-support" ).click(function(evt) {
       // cliccou no support
       
       // alert(evt.target.id);
       
       
       $modalvma = $('.bill-support-kardealer')
       var activated = $('#activated').val();
       
       if(activated !== '1')
       {
                        $("#kardealer-not-activated").dialog({
                            modal: true,
                            
                            width: 400,height:220,
                            position: {
                                  my: 'center top',      //The point on the dialog box
                                  at: 'center top',      //The point on the target element
                                  of: $('#wpbody')  //The target element
                              },
  
  
                            title: "Alert ...",
                            open: function () {
                                var markup = '<br><h3>You forgot of Opt-In.<br>Please, read more at top page and click Opt-In Now button.</h3>';
                                $(this).html(markup);
                            },
                            buttons: {
                                Ok: function () {
                                    $(this).dialog("close");
                                    location.reload();
                                    /* $("#kardealer-not-activated").remove(); */
                                }
                            }
                        }); //end confirm dialog      
        
 
           return 1; 
       }    
      
       $modalvma.prependTo($('.wpbody')).slideDown();
       $modalvma.slideDown();      
   });
       
  $( ".button-close-spdialog" ).click(function() {
     $modalvma.slideUp();
     return '1';
  });
  
  $( ".button-close-spsubmit" ).click(function() {
       // submeteu support
                    // var isAnonymousFeedback = $(".anonymous").prop("checked");
                     var explanation = $('#explanation').val();
                     var username = $('#username').val();
                     var version = $("#version").val();
                     var email = $('#email').val();
                     var produto = $('#produto').val();
                     var wpversion = $('#wpversion').val();
                     var activated = $('#activated').val();
                     var dom = document.domain;
                     var limit = $('#limit').val();
                     var wplimit = $('#wplimit').val();
                     var usage = $('#usage').val();
                     
                     
                     if(explanation.length === 0)
                     {
                        $('<div id="dlg"></div>').dialog({
                            modal: true,
                            title: "Missing ...",
                            open: function () {
                                var markup = 'Empty Support Question!';
                                $(this).html(markup);
                            },
                            buttons: {
                                Ok: function () {
                                    $(this).dialog("close");
                                    $("#dlg").remove();
                                }
                            }
                        }); //end confirm dialog
    

                        return 1;
                     }
 
                     $('#kardealer-imagewait3').css('visibility','visible');
                     $( ".button-close-spbsubmit" ).addClass('disabled');
                     $( ".button-close-spdialog" ).addClass('disabled');
                     $.ajax({
                	    url       : 'http://billminozzi.com/httpapi/httpapi.php',
                        withCredentials: true,
                        timeout: 15000,
                		method    : 'POST',
                        crossDomain: true,
                		data      : {
                		    email: email,
                            name: username,
                            dom: dom,
                            version: version,
                            produto: produto,
                            wpversion: wpversion,
                            obs: explanation,
                            limit: limit,
                            wplimit: wplimit,
                            usage: usage,
                            status: 'support'
                			},
                		complete  : function () {

                             // $modalvma = $('.bill-feedback-kardealer')
                              $('#kardealer-imagewait2').css('visibility','hidden');
                              $modalvma.slideUp();
                              //alert("Thanks for your fedback!");
                                $('<div id="dlg"></div>').dialog({
                                modal: true,
                                title: "Message Sent!",
                                open: function () {
                                    var markup = 'We will answer in 1 business day <br> to your email: '+email+'<br />Remember to check also your SPAM folder.';
                                    $(this).html(markup);
                                },
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                         $("#dlg").remove();
                                        location.reload();
                                    }
                                }
                               }); //end confirm dialog      
                              
                              // location.reload();
                              return 1;
                              
                        }
                	 }); // end ajax  
                   // location.reload();       
  });
   
   /*  Feedback ------ */
   $( "#kardealer-give-feedback" ).click(function(evt) {
       // cliccou no feedback
       
       $modalvmaf = $('.bill-feedback-kardealer');
       // console.log($modalvma);
       $modalvmaf.prependTo($('.wpbody')).slideDown();
       // $modalvma.css('display', 'block');
       $modalvmaf.slideDown();
   });
       
  $( ".button-close-fbdialog" ).click(function() {
     $modalvmaf.slideUp();
     return '1';
  });
  
  $( ".button-close-fbsubmit" ).click(function() {
       // submeteu feedback
                     var isAnonymousFeedback = $(".anonymous2").prop("checked");
                     var explanation = $('#explanationfb').val();
                     var username = $('#username').val();
                     var version = $("#version").val();
                     var email = $('#email').val();
                     var produto = $('#produto').val();
                     var wpversion = $('#wpversion').val();
                     var dom = document.domain;
                     var limit = $('#limit').val();
                     var wplimit = $('#wplimit').val();
                     var usage = $('#usage').val();

                     if(explanation.length === 0)
                     {
                        // alert('Empty Feedback!');
                    //    $("<div>My div content</div>").dialog();
                        
                        
                        $('<div id="dlg"></div>').dialog({
                            modal: true,
                            title: "Missing ...",
                            open: function () {
                                var markup = 'Empty Feedback!';
                                $(this).html(markup);
                            },
                            buttons: {
                                Ok: function () {
                                    $(this).dialog("close");
                                    $("#dlg").remove();
                                }
                            }
                        }); //end confirm dialog
    

                        return 1;
                     }
                    if(isAnonymousFeedback)
                    {
                		    email = 'anonymous';
                            username = 'anonymous';
                            dom = 'anonymous';
                            version = 'anonymous';
                            wpversion = 'anonymous';
                            limit = 'anonymous';
                            wplimit = 'anonymous';
                            usage = 'anonymous';                            
                    } 
                     $('#kardealer-imagewait2').css('visibility','visible');
                     $( ".button-close-fbsubmit" ).addClass('disabled');
                     $( ".button-close-fbdialog" ).addClass('disabled');
                     $.ajax({
                	    url       : 'http://billminozzi.com/httpapi/httpapi.php',
                        withCredentials: true,
                        timeout: 15000,
                		method    : 'POST',
                        crossDomain: true,
                		data      : {
                		    email: email,
                            name: username,
                            dom: dom,
                            version: version,
                            produto: produto,
                            wpversion: wpversion,
                            obs: explanation,
                            limit: limit,
                            wplimit: wplimit,
                            usage: usage,
                            status: 'f'
                			},
                		complete  : function () {
                          if(! isAnonymousFeedback)
                          {
                             // Cookie
                             var d = new Date();
                             d.setTime(d.getTime() + (1*60*60*1000));
                             var expires = "expires="+ d.toUTCString();
                             cvalue = "1-"+dom;
                             document.cookie = "bill_activated_vm" + "=" + cvalue + ";" + expires + ";path=/";
                             // location.reload();
                          }
                              $modalvmaf = $('.bill-feedback-kardealer')
                              $('#kardealer-imagewait2').css('visibility','hidden');
                              $modalvmaf.slideUp();
                              //alert("Thanks for your fedback!");
                                $('<div id="dlg"></div>').dialog({
                                modal: true,
                                title: "Message",
                                open: function () {
                                    var markup = '<h2>Thanks for your fedback!</h2>';
                                    $(this).html(markup);
                                },
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                         $("#dlg").remove();
                                        location.reload();
                                    }
                                }
                               }); //end confirm dialog      
                              
                              // location.reload();
                              return 1;
                              
                        }
                	 }); // end ajax  
                   // location.reload();       
  });
  
  $("#kardealer-btn-connect-now" ).click(function(evt) {
                     var username = $('#username2').val();
                     var version = $("#version2").val();
                     var email = $('#email2').val();
                     var produto = $('#produto2').val();
                     var wpversion = $('#wpversion2').val();
                     var dom = document.domain;
                     var limit = $('#limit').val();
                     var wplimit = $('#wplimit').val();
                     var usage = $('#usage').val();

                     $('#kardealer-imagewait').css('visibility','visible');
                     $( "#kardealer-btn-connect-now" ).addClass('disabled');
                     $.ajax({
                	    url       : 'http://billminozzi.com/httpapi/httpapi.php',
                        withCredentials: true,
                        timeout: 15000,
                		method    : 'POST',
                        crossDomain: true,
                		data      : {
                		    email: email,
                            name: username,
                            dom: dom,
                            version: version,
                            produto: produto,
                            wpversion: wpversion,
                            status: 'activated',
                            limit: limit,
                            wplimit: wplimit,
                            usage: usage

                			},
                		complete  : function () {
                             // Cookie
                             var d = new Date();
                             d.setTime(d.getTime() + (1*60*60*1000));
                             var expires = "expires="+ d.toUTCString();
                             cvalue = "1-"+dom;
                             document.cookie = "bill_activated_vm" + "=" + cvalue + ";" + expires + ";path=/";
                             $('#kardealer-imagewait').css('visibility','hidden');
  
                                $('<div id="dlg"></div>').dialog({
                                modal: true,
                                title: "Message",
                                open: function () {
                                    var markup = '<h2>Thanks for Opt-In!</h2>';
                                    $(this).html(markup);
                                },
                                buttons: {
                                    Ok: function () {
                                         $(this).dialog("close");
                                         $("#dlg").remove();
                                         location.reload(); 
                                    }
                                }
                               }); //end confirm dialog                            
                               /* location.reload(); */
                        }
                	 }); // end ajax  
                    /* location.reload();  */     
    });
    
    
  /*  Faq ------ */
  $( ".button-close-faqsubmit" ).click(function() {
       // submeteu faq
       
                     $('#kardealer-imagewait20').css('visibility','hidden');

                     var isAnonymousFeedback = $(".anonymous20").prop("checked");
                     var explanation = $('#explanationfaq').val();
                     var username = $('#username').val();
                     var version = $("#version").val();
                     var email = $('#email').val();
                     var produto = $('#produto').val();
                     var wpversion = $('#wpversion').val();
                     var dom = document.domain;
                     var limit = $('#limit').val();
                     var wplimit = $('#wplimit').val();
                     var usage = $('#usage').val();
                    
                     
                     if(explanation.length === 0)
                     {
                        $('<div id="dlg"></div>').dialog({
                            modal: true,
                            title: "Missing ...",
                            open: function () {
                                var markup = 'Empty Question!';
                                $(this).html(markup);
                            },
                            buttons: {
                                Ok: function () {
                                    $(this).dialog("close");
                                    $("#dlg").remove();
                                }
                            }
                        }); //end confirm dialog
    

                        return 1;
                     }
                    if(isAnonymousFeedback)
                    {
                		    email = 'anonymous';
                            username = 'anonymous';
                            dom = 'anonymous';
                            version = 'anonymous';
                            wpversion = 'anonymous'; 
                            limit = 'anonymous';
                            wplimit = 'anonymous';
                            usage = 'anonymous';                       
                    } 
                     $('#kardealer-imagewait20').css('visibility','visible');
                     $( ".button-close-faqsubmit" ).addClass('disabled');
                     $.ajax({
                	    url       : 'http://billminozzi.com/httpapi/httpapi.php',
                        withCredentials: true,
                        timeout: 15000,
                		method    : 'POST',
                        crossDomain: true,
                		data      : {
                		    email: email,
                            name: username,
                            dom: dom,
                            version: version,
                            produto: produto,
                            wpversion: wpversion,
                            obs: explanation,
                            status: 'q',
                            limit: limit,
                            wplimit: wplimit,
                            usage: usage,
                			},
                		complete  : function () {
                              $modalvmaf = $('.bill-feedback-kardealer')
                              $('#kardealer-imagewait20').css('visibility','hidden');
                                $('<div id="dlg"></div>').dialog({
                                modal: true,
                                title: "Message",
                                open: function () {
                                    var markup = '<h2>Thanks for your Question!</h2>';
                                    $(this).html(markup);
                                },
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                         $("#dlg").remove();
                                        location.reload();
                                    }
                                }
                               }); //end confirm dialog      
                              
                              // location.reload();
                              return 1;
                              
                        }
                	 }); // end ajax  
                   // location.reload();       
  });
    
});// jquery