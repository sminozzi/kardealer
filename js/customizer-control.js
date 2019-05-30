(function( $ ) {
    
 
    
    wp.customize.bind( 'ready', function() {
        var customize = this;
        var customize = wp.customize;
        customize.previewer.bind( 'preview-edit', function( data ) {
            var data = JSON.parse( data );
            var control = customize.control( data.name );
             if (data.name == 'kardealer_sidebar')
             {
               // var mypage = location.protocol+'//'+document.domain+'/wp-admin/widgets.php'
               // window.location.href = mypage;
                control =  customize.panel( 'widgets' );
               //  control =  customize.section( 'sidebar' );
             }
                 control.focus();
        } );
        
        
        
        
        
         
         /* --- Part 2 ---- */
         wp.customize.control('kardealer_header_style', function (control) {
        			/**
        			 * Run function on setting change of control.
        			 */
        			control.setting.bind(function (value) {
        			 
                    // alert(value);
                     
        				switch (value) {
        					/**
        					 * The select was switched to the hide option.
        					 */
        					case '2':
        						/**
        						 * Deactivate the conditional control.
        						 */
        						// wp.customize.control('kardealer_header_background_color').deactivate();
                                $("#customize-control-kardealer_header_text_bottom").hide();
                                $("#customize-control-image_control_one").hide();
                                $("#customize-control-kardealer_header_text_color").hide();
                              
                                break;
        					/**
        					 * The select was switched to »show«.
        					 */
        					case '1':
        						/**
        						 * Activate the conditional control.
        						 */
        						// wp.customize.control('kardealer_header_background_color').activate();
                                $("#customize-control-kardealer_header_text_bottom").show();
                                $("#customize-control-image_control_one").show();
                                $("#customize-control-kardealer_header_text_color").hide();
                  
                  
                                break;
        				}
        			});
        		});
        
        /* end part 2 -----*/        
        
        
        
        
        
        
        
        
        
    } );
    

    
})( jQuery );