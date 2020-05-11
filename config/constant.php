<?php 
define("PROJECT", "grrekTrust");
define("BASE_URL", url());

/**
 * get base url of project
 */
function url(){
   if(isset($_SERVER['HTTPS'])){
      $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
   } else{
      $protocol = 'http';
   }
   return $protocol . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
}
?>