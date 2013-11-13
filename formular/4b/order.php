<!DOCTYPE html>
    
<html lang=de>
    
<head>
<meta charset=utf-8>
<title>Pizza Bestellung - 2012</title>
<link rel="stylesheet" href="..c/style.css" />
</head>

<body>

<div class="order">

    <h1>Pizza Bestellung</h1>
    
<?php
    
	echo '<pre>';
    var_dump($_GET);
    echo '</pre>';
	
    $pizza_magerita = $_GET['pizza_magerita'];
    $pizza_diavolo  = $_GET['pizza_diavolo'];
    $pizza_palermo  = $_GET['pizza_palermo'];
    
    $first_name     = $_GET['first_name'];
    $last_name      = $_GET['last_name'];
    $phone          = $_GET['phone'];
    
    echo("<h1>Das hast Du bestellt!</h1>");
    echo("<p>Folgende Bestellung ist bei uns eingelangt:</p>");
    echo("<p>$pizza_magerita Pizza Magerita</p>");
    echo("<p>$pizza_diavolo Pizza Diavolo</p>");
    echo("<p>$pizza_palermo Pizza Palermo</p>");  
    echo("<h2>Deine Lieferadresse</h2>");
    echo("<p>$first_name $last_name</p>");
    echo("<p>$phone</p>");   
    echo("<p class=\"gap\"><strong>Danke für deine Bestellung!</strong></p>");   
	
	$to = "mr.raudusch@";
	$subject = "Pizza Order";
	$message = "Siehe Bestellung";
	
	mail($to, $subject, $message)

?>

</div>

</body>
</html>