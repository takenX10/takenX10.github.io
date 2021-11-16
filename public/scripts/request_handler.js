// add 

window.onload = function(){
    const form_add = document.querySelector('.form-add');
    if(form_add != null){
        form_add.addEventListener('submit', event => {
            event.preventDefault();
            if(form_add[0].value == 'members'){
                var data = {
                    "type": form_add[0].value,
                    "Name": form_add[1].value,
                    "Nickname": form_add[2].value,
                    "Year": form_add[3].value,
                    "Link": form_add[4].value,
                    "Description":form_add[5].value,
                    "Image": form_add[6].value
                };
            }else if(form_add[0].value == 'writeups'){
                var data = {
                    "type":form_add[0].value,
                    "Name":form_add[1].value,
                    "Category":form_add[2].value,
                    "Content":form_add[3].value,
                }   
            }else if(form_add[0].value == 'news'){
                var data = {
                    "type":form_add[0].value,
                    "Name":form_add[1].value,
                    "date":form_add[2].value,
                    "previewimage":form_add[3].value,
                    "description":form_add[4].value,
                    "Content":form_add[5].value,
                }   
            }
            postData('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/add-manager',data)
            .then(data => {
                feedback(data, 'add-'+form_add[0].value);
            });
        });
    }
    
    const img_add = document.querySelector('.img-add');
    if(img_add != null){
        img_add.addEventListener('submit', event => {
            event.preventDefault();
            var form = event.target;
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
            }).then( data =>{
                feedback(data, 'add-images');
            });
        });
    }
    // remove
    const form_remove = document.querySelector('.form-remove');
    form_remove.addEventListener('submit', function(event) {
        event.preventDefault();
        var checkboxes = document.getElementsByClassName('checkbox-element');
        var removelist = [];
        for (var checkbox of checkboxes){
            if (checkbox.checked) {
                removelist.push(checkbox.value);
            }   
        }
        var data = {
            "type": form_remove[0].value,
            "list": removelist
        };
        postData('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/remove-manager',data)
        .then(data => {
            feedback(data, 'remove-'+form_remove[0].value);
        });
    });
}