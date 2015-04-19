var submit = document.getElementById('submit');
var file = document.getElementById('file');

var upload = function(){

    if(file.files.length === 0){
        return;
    }

    var data = new FormData();
    data.append('SelectedFile', file.files[0]);
    data.append('location', '/yo/yo');

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            window.location.reload();
        }
    };

    request.open('POST', '/upload');
    request.send(data);
}

submit.addEventListener('click', upload);