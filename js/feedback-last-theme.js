jQuery(document).ready(function($) {

   var billprodclass = $('#billclass').val();
   
   $( "."+billprodclass+"-close-submit" ).text('Submit and Go');
   $( "."+billprodclass+"-deactivate" ).text('Skip');

   $modal_theme = $('.'+billprodclass+'-wrap-deactivate')   
   $('#imagewaitfbl').hide();
    	   
   $( "*" ).click(function(evt) {
    if(evt.target.href != undefined)
    {
       mystr_theme = evt.target.href;
       
       if( mystr_theme.includes("/themes.php") && !mystr_theme.includes("?") && !mystr_theme.includes("#")   )

       {
         evt.preventDefault(mystr_theme); 
         myclass = $(evt.target).parent().prop("class");

         $( "."+billprodclass+"-close-dialog").click(function() {
               $('#imagewaitfbl').hide();
                 $modal_theme.slideUp();
            return 1;

         });  

        $modal_theme.prependTo($('#wpcontent')).slideDown();
        $('html, body').scrollTop(0);
                  
         $deactivateLink = mystr_theme;
                       
         $( "."+billprodclass+"-deactivate" ).click(function() {
             if( !$(this).hasClass('disabled'))
            {  
                $( "."+billprodclass+"-close-submit" ).addClass('disabled');
                $( "."+billprodclass+"-close-dialog" ).addClass('disabled');
                $( "."+billprodclass+"-deactivate" ).addClass('disabled');
                window.location.href = $deactivateLink; }
          });  
        $( "."+billprodclass+"-close-submit" ).click(function() {
                     var isAnonymousFeedback = $(".anonymous").prop("checked");
                     var explanation = $('#'+billprodclass+'-explanation').val();
                     var username = $('#username').val();
                     var version = $("#tversion").val();
                     var email = $('#email').val();
                     var produto = $('#produto').val();
                     var wpversion = $('#wpversion').val();
                     var dom = document.domain;
                     var limit = $('#limit').val();
                     var wplimit = $('#wplimit').val();
                     var usage = $('#usage').val();                    
                     $('#imagewaitfbl').show(); 
                     $( "."+billprodclass+"-close-submit" ).addClass('disabled');
                     $( "."+billprodclass+"-close-dialog" ).addClass('disabled');
                     $( "."+billprodclass+"-deactivate" ).addClass('disabled');
                    if(isAnonymousFeedback)
                    {
                		    email = 'anonymous';
                            username = 'anonymous';
                            dom = 'anonymous';
                            version = 'anonymous';
                            wpversion = 'anonymous';                       
                    } 
                     $.ajax({
                	    url       : 'http://billminozzi.com/httpapi/httpapi.php',
                        withCredentials: true,
                        timeout: 15000,
                		method    : 'POST',
                		data      : {
                		    email: email,
                            name: username,
                            obs: explanation,
                            dom: dom,
                            version: version,
                            produto: produto,
                            limit: limit,
                            wplimit: wplimit,
                            usage: usage,
                            wpversion: wpversion
                			},
                		complete  : function () {
                			// Do not show the dialog box, deactivate the plugin.
                			window.location.href = $deactivateLink;
                		}
                	 }); // end ajax
         }); // end clicked button share ...
        } // contain activate string       
      } // not undefined                             
   	}); // end clicked Deactivated ...

});  // end jQuery  