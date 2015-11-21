<?php
require_once '/Users/nazario/Sites/com/niztech/www/v3/niztech.com_extra/sensitive_settings.php';
require_once '/Users/nazario/Sites/com/niztech/www/v3/niztech.com_extra/Medoo/medoo.php';

$database = new medoo($mysqlSettings);

$data = $_GET['rating'];
$result = array('result' => false);

if( $data !== '' ){
  $databse->insert( 'rating', ['rating' => $data] );

  $error = $database->error();
  if($error[0] != '00000'){
    die(json_encode($result));
  }

}else{
  $result = array('result' => true);
}

// header('Content-Type: application/json');
echo('bob');
// echo( json_encode($result) );
?>
