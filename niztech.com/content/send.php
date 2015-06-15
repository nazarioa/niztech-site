<?php
require_once '../../niztech.com_extra/PHPMailer/PHPMailerAutoload.php';
require_once '../../niztech.com_extra/sensitive_settings.php';

$result = array('result'=>'fail', 'message'=>'Bug in the software!');

if($_POST['senderemail'] !== '' ){
  $to = 'nazario@niztech.com';

  $mail = new PHPMailer;

  // $mail->SMTPDebug = 3;                               // Enable verbose debug output

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = $smtpSettings['server'];  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = $smtpSettings['username'];          // SMTP username
  $mail->Password = $smtpSettings['password'];          // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = $smtpSettings['port'];                  // TCP port to connect to

  $mail->From = 'do-not-reply@niztech.com';
  $mail->FromName = $_POST['sendername'];
  $mail->addAddress($to, 'Nazario Ayala');     // Add a recipient
  // $mail->addAddress('ellen@example.com');               // Name is optional
  $mail->addReplyTo('do-not-reply@niztech.com', 'Niztech Webform');

  $mail->Subject = 'Message from '.$_POST['sendername'];
  $mail->Body    = 'This is a message via <strong>Niztech</strong><br> '.$_POST['sendermessage'];
  $mail->AltBody = 'This is a message via Niztech. \r\n '.$_POST['sendermessage'];

  if(!$mail->send()) {
    $result = array('result'=>'fail', 'message' => $mail->ErrorInfo);
  } else {
    $result = array('result'=>'success', 'message'=>'Message has been sent to: ' . $to .' from:"' . $_POST['senderemail'] . '"."' );
  }
}


header('Content-Type: application/json');
echo( json_encode($result) );
