

function add_show(){
    var aux = document.getElementsByClassName('buttons-class');
    aux[0].style.display='none';
    aux = document.getElementsByClassName('add');
    aux[0].style.display='';
    aux = document.getElementsByClassName('first-button-back');
    aux[0].style.display = 'none';
    aux = document.getElementsByClassName('second-button-back');
    aux[0].style.display = '';
}

function remove_show(){
    var aux = document.getElementsByClassName('buttons-class');
    aux[0].style.display='none';
    aux = document.getElementsByClassName('remove');
    aux[0].style.display='';
    aux = document.getElementsByClassName('first-button-back');
    aux[0].style.display = 'none';
    aux = document.getElementsByClassName('second-button-back');
    aux[0].style.display = '';
}

function add_hide(){
    var aux = document.getElementsByClassName('buttons-class');
    aux[0].style.display='';
    aux = document.getElementsByClassName('add');
    aux[0].style.display='none';
    aux = document.getElementsByClassName('first-button-back');
    aux[0].style.display = '';
    aux = document.getElementsByClassName('second-button-back');
    aux[0].style.display = 'none';
}

function remove_hide(){
    var aux = document.getElementsByClassName('buttons-class');
    aux[0].style.display='';
    aux = document.getElementsByClassName('remove');
    aux[0].style.display='none';
    aux = document.getElementsByClassName('first-button-back');
    aux[0].style.display = '';
    aux = document.getElementsByClassName('second-button-back');
    aux[0].style.display = 'none';
}