var Quill = require('quill')
const customTitlebar = require('custom-electron-titlebar');
 
var titleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#1d2233'),
});



var editor = new Quill('#editor', {
    modules: {
      toolbar: [
          
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });
// Save and Load files

var fs = require('fs');
var remote = require('electron').remote;
var dialog = remote.require('electron').dialog;

var loadedfs;

function saveFile() {
    if(!loadedfs) {
        dialog.showSaveDialog({ filters: [
						{ name: 'txt', extensions: ['txt'] },
            { name: 'html', extensions: ['html'] },
        ]}, function(filename) {
            if(filename === undefined) return;
            writeToFile(editor, filename);
        });
    }
    else {
        writeToFile(editor, loadedfs);
    }
}

function loadFile() {
    dialog.showOpenDialog({ filters: [
        { name: 'txt', extensions: ['txt', 'html'] },
				{ name: 'html', extensions: ['html', 'txt'] },
    ]}, function(filenames) {
        if(filenames === undefined) return;
        var filename = filenames[0];
        readFromFile(editor, filename);
        loadedfs = filename;
    })
}

function writeToFile(editor, filename) {
    var html = editor.getHTML();
    fs.writeFile(filename, html, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

function readFromFile(editor, filename) {
    fs.readFile(filename, "utf-8", function(err, data) {
        if(err) {
            console.log(err);
        }
        editor.setHTML(data);
    });
}
