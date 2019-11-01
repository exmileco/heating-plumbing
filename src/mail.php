<?php

if (isset($_POST['modal_username']) && isset($_POST['modal_phone'])){
$name = $_POST['modal_username'];
$phone = $_POST['modal_phone'];
} elseif (isset($_POST['popup_username']) && isset($_POST['popup_phone'])){
  $name = $_POST['popup_username'];
  $phone = $_POST['popup_phone'];
} else {
  echo "Данные не были переданы";
  exit();
}

$name = htmlspecialchars($name);
$email = htmlspecialchars($phone);
$name = urldecode($name);
$email = urldecode($phone);
$name = trim($name);
$phone = trim($phone);

if (mail("exmile.co@gmail.com", "Заявка с сайта", "ФИО:".$name.". E-mail: ".$phone ,"From: inmailer@coffeenglish.com \r\n"))
 {     
  $message = "Сообщение успешно отправлено!"; 
  echo "Сообщение успешно отправлено. Имя: " . $name . " телефон: " . $phone;

} else {
    $message = "При отправке сообщения возникли ошибки!"; 
    echo $message;
}

exit();
?>