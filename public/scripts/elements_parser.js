
function parseElements(json){
    json = decodeURIComponent(json);
    json = JSON.parse(json);
    var form_element = document.getElementsByClassName('form-remove');
    if(json['members'] != null){
        json = json['members'];
    }else if(json['writeups'] != null){
        json = json['writeups'];
    }else if(json['images']){
        json = json['images'];
    }
    json.forEach(element => {
        var name = element['Name'];
        var check_input = document.createElement('input');
        check_input.setAttribute('type', 'checkbox');
        check_input.setAttribute('class', 'btn-check my-4 checkbox-element');
        check_input.setAttribute('id', name);
        check_input.setAttribute('value',name);
        var check_label = document.createElement('label');
        check_label.setAttribute('class','btn btn-outline-primary m-2');    
        check_label.setAttribute('for',name);
        check_label.innerText = name;
        form_element[0].appendChild(check_input);
        form_element[0].appendChild(check_label);
    });
}