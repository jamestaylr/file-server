// Links to all the document objects
var submit = document.getElementById('submit');
var create = document.getElementById('create');
var file = document.getElementById('file');
var folder = document.getElementById('folder');

// Method for uploading files to the server
var upload = function() {

    // If there are no files selected, prevent upload
    if (file.files.length === 0) {
        return;
    }

    // Create new form data to send in the POST request
    var data = new FormData();
    // Append the uploaded file
    data.append('SelectedFile', file.files[0]);

    // Create and send the request
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            window.location.reload();
        }
    };
    request.open('POST', '/upload');
    request.send(data);
}

// Method for creating new directories in the server content folder
var createDirectory = function() {

    // If no folder name is specified prevent request
    if (folder.value.length == 0) {
        return;
    }

    // Create a JSON object as data to send in the POST requets body
    var folderString = JSON.stringify({
        'folder': folder.value
    });

    // Create and sned the request
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