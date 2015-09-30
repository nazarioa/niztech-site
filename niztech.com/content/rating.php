<?php
require_once '../../niztech.com_extra/sensitive_settings.php';
require_once '../../niztech.com_extra/Medoo/medoo.php';

$database = new medoo($mysqlSettings);

// $result = array('result'=>'fail', 'message'=>'Bug in the software!');
$result = 'Ran';

if($_POST['rating'] !== '' ){
  $value = $_POST['rating']
  $databse->insert('rating',['rating' => $value]);
}


header('Content-Type: application/json');
echo( json_encode($result) );
