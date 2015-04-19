var submit = document.getElementById('submit');
var create = document.getElementById('create');
var file = document.getElementById('file');
var folder = document.getElementById('folder');

var upload = function() {

    if (file.files.length === 0) {
        return;
    }

    var data = new FormData();
    data.append('SelectedFile', file.files[0]);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            window.location.reload();
        }
    };

    request.open('POST', '/upload');
    request.send(data);
}

var createDirectory = function() {

    if (folder.value.length == 0) {
        return;
    }

    var folderString = JSON.stringify({
        'folder': folder.value
    });

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            window.location.reload();
        }
    };
    request.open('POST', '/create');
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(folderString);

}

submit.addEventListener('click', upload);
create.addEventListener('click', createDirectory);