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


var Delta = Quill.import('delta');
var startTime = Date.now();
var interval = Math.floor((Date.now() - startTime) / 1000);;
var socket = require("./socket");
var s = new socket();

var change = new Delta();
editor.on('text-change', function (delta, oldDelta, source) {
    if (source == 'user') {
        start = Date.now();
        var pos = editor.getLength();

        var content = editor.getContents();
        content = String(content["ops"][0]["insert"]);
        // console.log(content[content.length-2]);
        if (content[content.length - 2] === ".") {
            var text = [... new Set(content.split("."))];
            var index = text.length - 1;
            // console.log(text[index - 1]);
            s.send(text[index - 1])
        }




        // $.post('/socket-endpoint', { 
        //    partial: JSON.stringify(change)
        //});
        //console.log(Date.now());
     
    }
});