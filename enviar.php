<?php

$imagens = ($_FILES['arquivo']);
$indice = count(array_filter($imagens["name"]));

if ($indice <= 0) {
    echo "Voce nao selecionou nenhuma imagem";
} else {
    for ($i = 0; $i < $indice; $i++) {

        $imagens["name"][$i];
        $enviar = move_uploaded_file($imagens["tmp_name"][$i], "upload/" . $imagens["name"][$i]);
    }

    if ($enviar) {
        echo "Foi enviado Corretamente.";
    } else {
        echo "Erro.";
    }
}
