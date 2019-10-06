var Quill = require('quill')
const customTitlebar = require('custom-electron-titlebar');

var titleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#1d2233'),
});



var editor = new Quill('#editor', {
    modules: {
        toolbar: [

            [{ header: [1, 2, 3, 4, false] }],
            ['bold'],
            ['italic'],
            ['underline'],
            ['strike'],
            ['image'],
            ['code-block']
        ]
    },
    placeholder: 'Start writing here...',
    theme: 'snow'  // or 'bubble'
});
// Save and Load files

var fs = require('fs');
var remote = require('electron').remote;
var dialog = remote.require('electron').dialog;

var loadedfs;

function saveFile() {
    if (!loadedfs) {
        dialog.showSaveDialog({
            filters: [
                { name: 'txt', extensions: ['txt'] },
                { name: 'html', extensions: ['html'] },
            ]
        }, function (filename) {
            if (filename === undefined) return;
            writeToFile(editor, filename);
        });
    }
    else {
        writeToFile(editor, loadedfs);
    }
}

function loadFile() {
    dialog.showOpenDialog({
        filters: [
            { name: 'txt', extensions: ['txt', 'html'] },
            { name: 'html', extensions: ['html', 'txt'] },
        ]
    }, function (filenames) {
        if (filenames === undefined) return;
        var filename = filenames[0];
        readFromFile(editor, filename);
        loadedfs = filename;
    })
}

function writeToFile(editor, filename) {
    var html = editor.getText();
    fs.writeFile(filename, html, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function readFromFile(editor, filename) {
    fs.readFile(filename, "utf-8", function (err, data) {
        if (err) {
            console.log(err);
        }
        editor.getContents(data);
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


$(".specefic-search").click(function () {
    var range = editor.getSelection();
    if (range) {
       if(range.length != 0) {
            var text = editor.getText(range.index, range.length);
            s.send(text);
        }
    } else {
        console.log('User cursor is not in editor');
    }
});

$(".stop-search").click(function(){
    if(s.contSend){
        $(".stop-search img").css("opacity",".5")
    }
    else{
        $(".stop-search img").css("opacity","1")
    }
    s.contSend = !s.contSend;
});

$(document).on('click', '.save-button', function () {
saveFile()
});
