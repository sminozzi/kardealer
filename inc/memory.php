<?php

/**
 * @author William Sergio Minossi
 * @copyright 2017
 */

$memory['limit'] = (int) ini_get('memory_limit') ;
if ($memory['limit'] > 9999999)
    $memory['limit'] = ($memory['limit'] / 1024) / 1024;


if (!is_numeric($memory['usage'])) {
    $sbb_memory = 'Unable to Check!';
    return;
}
if (!is_numeric($memory['limit'])) {
    $sbb_memory = 'Unable to Check!';
    return;
}
if (!is_numeric($memory['usage'])) {
    $sbb_memory = 'Unable to Check!';
    return;
}
if ($memory['usage'] < 1) {
    $sbb_memory = 'Unable to Check!';
    return;
}


	
$memory['usage'] = function_exists('memory_get_usage') ? round(memory_get_usage() / 1024 / 1024, 0) : 0;
// $memory['percent'] = round ($memory['usage'] / $memory['limit'] * 100, 0);

$msg_type = 'notok';
if(defined("WP_MEMORY_LIMIT"))
{
  $memory['wp_limit'] =  trim(WP_MEMORY_LIMIT) ;
  $wplimit = $memory['wp_limit'];
  
  $wplimit = substr($wplimit,0,strlen($wplimit)-1);
  $memory['wp_limit'] = $wplimit;
  
  if($wplimit >= 128)
     $msg_type = 'ok';
}
else
   $memory['wp_limit'] = 'Not defined!';
 
 

   
//$memory['color'] = 'font-weight:normal;';
//if ($memory['percent'] > 75) $memory['color'] = 'font-weight:bold;color:#E66F00';
//if ($memory['percent'] > 90) $memory['color'] = 'font-weight:bold;color:red';
		
// echo 'Memory WordPress Limit: '.$memory['wp_limit'].' &nbsp;&nbsp;&nbsp;  |&nbsp;&nbsp;&nbsp;   Usage: '.$memory['usage'].' of '.$memory['limit']. 'MB  (<span style="' . $memory['color'] . '">'.$memory['percent'].'%</span>)';

echo '<div id="kardealer-memory-page">';

        
echo '<div class="kardealer-block-title">'; 
echo 'Memory Info';
echo '</div>';

echo '<div id="memory-tab">';
        

echo '<br />';
if($msg_type == 'ok')
 $mb = 'MB';
else
 $mb = '';
 
echo 'Current memory WordPress Limit: ' . $memory['wp_limit'] . $mb .
    '&nbsp;&nbsp;&nbsp;  |&nbsp;&nbsp;&nbsp;';


$perc = $memory['usage'] / $memory['wp_limit'];

if ($perc > .7)
   echo '<span style="color:red;">';
   
       
echo 'Your usage now: ' . $memory['usage'] .
    'MB &nbsp;&nbsp;&nbsp;';
    
if ($perc > .7)
   echo '</span>';    
    
echo '|&nbsp;&nbsp;&nbsp;   Total Server Memory: ' . $memory['limit'] .
    'MB';
// echo 'Current memory WordPress Limit: '.$memory['wp_limit'].$mb.'&nbsp;&nbsp;&nbsp;  |&nbsp;&nbsp;&nbsp;   Your usage: '.$memory['usage'].'MB of '.$memory['limit'];


   echo '<br />';    
   echo '<br />'; 
   echo '<br />';


if(! memory_status())
{?>
    
 
   To release all theme power, please, increase the WordPress memory limit to 128M or more.
   <br />
      <strong> 
   
   <!-- Button -->
   <?php
   

   $memory_limit = (int)$memory['limit'];
   
   
   echo '<br />';  
   
   if(! is_multisite() and $memory_limit >= 128)
   {
     echo 'We can fix it with just one click:';
     echo '<br />';
     echo '<a href="#" id="themefix-wpconfig-button" class="button button-primary">Fix it Now!</a>';
     echo '<br />';    
     echo '<br />';
     echo '<hr>';
     echo 'Follow this instructions to do it manually:';
     echo '<br />';     
     
     
   }
      
 } ?>  
   
   
   </strong>

<!-- <div id="memory-tab"> -->

    <br />
    To increase the WordPress memory limit, add this info to your file wp-config.php (located at root folder of your server)
    <br />
    (just copy and paste)
    <br />    <br />
<strong>    
define('WP_MEMORY_LIMIT', '128M');
</strong>
    <br />    <br />
    before this row:
    <br />
    /* That's all, stop editing! Happy blogging. */
    <br />
    <br />
    If you need more, just replace 128 with the new memory limit.
    <br /> 
    To increase your total server memory, talk with your hosting company.
    <br />   <br />
    <hr />
    <br />    
<strong>    How to Tell if Your Site Needs a Shot of more Memory:</strong>
    
        <br />    <br />
    If your site is behaving slowly, or pages fail to load, you 

    get random white screens of death or 500 

    internal server error you may need more memory. 
    
Several things consume memory, such as WordPress itself, the plugins installed, the 

theme you're using and the site content.
     <br />  

Basically, the more content and features you add to your site, 

the bigger your memory limit has to be.


if you're only running a small 

site with basic functions without a Page Builder and Theme 

Options (for example the native Twenty Sixteen). However, once 

you use a Premium WordPress theme and you start encountering 

unexpected issues, it may be time to adjust your memory limit 

to meet the standards for a modern WordPress installation.

     <br /> <br />    
    Increase the WP Memory Limit is a standard practice in 

WordPress and you find instructions also in the official 

WordPress documentation (Increasing memory allocated to PHP).
    <br /><br />
    
Here is the link:    
<br />

<a href="https://codex.wordpress.org/Editing_wp-config.php" target="_blank">https://codex.wordpress.org/Editing_wp-config.php</a>



</div>

</div>

