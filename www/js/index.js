$(function() {
    setTimeout(hideSplash, 2000);
});

function hideSplash() {
    $.mobile.changePage("#pgLista", "fade");
}

function pEnviarEmail(){
    console.log('Enviar e-mail');
    var tFichero = {
        Nombre: document.getElementById('edNomFic').value + ".txt"
    };
    console.log('Conectando sistema de archivos');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    function gotFS(fileSystem) {
        fileSystem.root.getFile(tFichero.Nombre, {create: true}, function (fileentry){
            var sRuta = fileentry.nativeURL.substring(6);
            window.plugin.email.open({
                to:      ['DarkDefenderCL@gmail.com'],
                cc:      ['grufanet81@gmail.com'],
                bcc:     ['', ''],
                subject: 'Envío de partes',
                body:    'Envío los partes del día de hoy',
                attachments: ['absolute:'+sRuta]
            });
        }, fail);
    }

    function fail(error) {
        alert('BOO!');
    }
}

function pLimpiarContenido(){
    console.log('Limpiar contenido');
    document.getElementById('edNomFic').value = '';
    document.getElementById('edtexto').value = '';
}

function pEscribirFichero(){
    console.log('Escribir fichero');
    var tFichero = {
        Nombre: document.getElementById('edNomFic').value + ".txt",
        Texto: document.getElementById('edtexto').value
    };

    //Accedemos al sistema de archivos
    console.log('Conectando sistema de archivos');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    function gotFS(fileSystem) {
        fileSystem.root.getFile(tFichero.Nombre, {create: true}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.seek(writer.length);     //Nos posicionamos al final del fichero
        writer.write(tFichero.Texto);   //Escribimos el nuevo texto
    }

    function fail(error) {
        alert('BOO!');
    }
}

function pLeerFichero(){
    console.log('Leer fichero');
    var tFichero = {
        Nombre: document.getElementById('edNomFic').value + ".txt"
    };

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    function gotFS(fileSystem) {
        fileSystem.root.getFile(tFichero.Nombre, {create: true}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readAsText(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            document.getElementById('edtexto').value = evt.target.result;
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
}

