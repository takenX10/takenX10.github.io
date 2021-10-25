
function responseElementCreator(testo, bgcolor){
    var button_element = document.getElementsByClassName('button-row');
    var child_div = document.createElement('div');
    child_div.setAttribute('class',bgcolor+' justify-self-center align-items-center justify-content-center text-center d-flex');
    child_div.setAttribute('style','position:absolute; width:100%; height: 100%; top:0; left:0;')
    var child_p = document.createElement('p');
    child_p.setAttribute('class','text-light display-1 m-2');
    child_p.innerText = testo + " La pagina verrà ricaricata.";
    child_div.appendChild(child_p);
    button_element[0].appendChild(child_div);
    // ricarica la pagina dopo 2 secondi
    setTimeout(function(){
        location.reload();
    }, 2000); 
}

function feedback(data, text){
    var value = data['status'];
    if(data['value'] == 'correct!'){
        value = 200;
    }else if(data['value'] == 'ERROR!'){
        value = 500;
    }
    var testo = '';
    var testo_errore = 'Errore!';
    switch(text){
        case 'add-members':
            testo = 'Membro aggiunto correttamente';
            break;
        case 'add-images':
            testo = 'Immagine aggiunta correttamente';
            break;
        case 'add-writeups':
            testo = 'Writeup aggiunto correttamente';
            break;
        case 'remove-members':
            testo = 'Membro rimosso correttamente';
            break;
        case 'remove-images':
            testo = 'Immagine rimossa correttamente';
            break;
        case 'remove-writeups':
            testo = 'Writeup rimosso correttamente';
            break;
    }
    if(value == 200){
        responseElementCreator(testo, 'bg-success');
    }else if(value == 500){
        responseElementCreator(testo_errore, 'bg-danger');
    }

}