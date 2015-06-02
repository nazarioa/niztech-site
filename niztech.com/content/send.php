<?php
require '../../niztech.com_extra/PHPMailer/PHPMailerAutoload.php';

// echo json_encode($_POST);

if($_POST['senderemail'] != '' ){
  $to = 'nazario@niztech.com';

  $mail = new PHPMailer;

  //$mail->SMTPDebug = 3;                               // Enable verbose debug output

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'mail.niztech.com';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'nazario@niztech.com';                 // SMTP username
  $mail->Password = 'ou812ttniztech';                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 587;                                    // TCP port to connect to

  $mail->From = 'do-not-reply@niztech.com';
  $mail->FromName = $_POST['sendername'];
  $mail->addAddress($to, 'Nazario Ayala');     // Add a recipient
  // $mail->addAddress('ellen@example.com');               // Name is optional
  $mail->addReplyTo('do-not-reply@niztech.com', 'Niztech Webform');
  // $mail->addCC('cc@example.com');
  // $mail->addBCC('bcc@example.com');

  // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = 'Message from '.$_POST['sendername'];
  $mail->Body    = 'This is a message via <strong>Niztech</strong><br> '.$_POST['sendermessage'];
  $mail->AltBody = 'This is a message via Niztech. \r\n '.$_POST['sendermessage'];

  if(!$mail->send()) {
    $error = array('result'=>'fail', 'message' => $mail->ErrorInfo);
    echo json_encode($error);
  } else {
    $result = array('result'=>'success', 'message'=>'Message has been sent to: ' . $to .' from:"' . $_POST['senderemail'] . '"."' );
    echo json_encode($result);
  }
}
