<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');

$files= count($_FILES['files']['name']);
if($files >0){
    for($i=0; $i <$files; $i++){
        $tmpFIlePath= $_FILES['files']['tmp_name'][$i]
        $newFileName= './assets/image/' .$_FILES['files']['name'][$i];
        copy($tmpFIlePath, $newFileName);
    }
}

?>
