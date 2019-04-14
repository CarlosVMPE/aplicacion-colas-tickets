// Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');
console.log(escritorio);

if (escritorio > 0 && escritorio < 5) {
    $('h1').text('Escritorio ' + escritorio);

    $('button').on('click', function () {
        socket.emit('atenderTicket', { escritorio: escritorio }, function (resp) {
            if (resp === 'No hay más tickets') {
                //alert(resp);
                label.text(resp);
                return;
            }
            label.text('Ticket ' + resp.numero);
        });
    });
} else {
    alert('Debe ingresar un escritorio entre 1 a 4');
    window.location = "index.html";
}