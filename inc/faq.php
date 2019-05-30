<?php
/**
 * @author William Sergio Minossi
 * @copyright 2017
 */
 
 if(! memory_status())
 {
    echo '<h3>Kar Dealer Theme Running in Save Memory Mode.</h3>';
    return;
  }   
      
?>
    <div id="kardealer-faq-page">
        <div class="kardealer-block-title"> 
               Faq Page
        </div>
    <div class="bill-faq-kardealer-wrap" style="">
     <div class="bill-faq-kardealer" style="">
     Please, help us to create this FAQ (Frequent Asked Questions) page.
     <br /><br />
     Just add your question, we will send you the response by email and add here next version.
     <br />
     Please, give us 1 business day and check your email:&nbsp;<b><?php echo $email;?></b>
     <br />
     Check also your spam folder.
     <br />
     We are in West Europe (London time). Our business hours: 9 to 17H. (Monday-Friday)
     <br /><br />
     <textarea rows="6" id="explanationfaq" name="explanation" placeholder="<?php _e("type here your question ...","kardealer");?>" style="width:100%;" ></textarea>
                 <?php
                 if($activated != '1' )
                 {
  ?>
                    <br /><br /> 
                    <input type="checkbox" class="anonymous20" value="anonymous" /><small>Participate anonymous <?php _e("(In this case, we are unable to email you)","kardealer");?></small>
           <?php } ?>  
                 <br /><br /> 			
		    			<a href="#" class="button button-primary button-close-faqsubmit"><?php _e("Submit","kardealer");?></a>
                        <img alt="aux" src="/wp-admin/images/wpspin_light-2x.gif" id="kardealer-imagewait20" style="visibility:hidden" />
                        <input type="hidden" id="version" name="version" value="<?php echo $themeversion;?>" />
		                <input type="hidden" id="email" name="email" value="<?php echo $email;?>" />
		                <input type="hidden" id="username" name="username" value="<?php echo $username;?>" />
		                <input type="hidden" id="produto" name="produto" value="kardealer" />
		                <input type="hidden" id="wpversion" name="wpversion" value="<?php echo $wpversion;?>" />
		                <input type="hidden" id="limit" name="limit" value="<?php echo $memory['limit'];?>" />
		                <input type="hidden" id="wplimit" name="wplimit" value="<?php echo $memory['wplimit'];?>" />
   		                <input type="hidden" id="usage" name="usage" value="<?php echo $memory['usage'];?>" />
                 <br /><br />
     </div>
    </div>
  </div>