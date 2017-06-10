<?php
	exec('/usr/bin/omxplayer ./play.mp3');
	$arr = array('sound' => "sound.mp3", 'status' => "played");
	echo json_encode($arr);
?>