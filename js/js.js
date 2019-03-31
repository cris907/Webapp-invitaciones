'use strict'

window.onload = iniciar;

function iniciar(){
    //Seleccionamos boton para añadir nuevos invitados
    var enviar = document.getElementById('enviar');
    //Creamos evento click en el botón
    enviar.addEventListener('click', añadirInvitado, false);     

    //Seleccionamos input para ocultar invitados
    var ocultar = document.getElementById('ocultar');
    //Creamos evento click en el input ocultar
    ocultar.addEventListener('click', ocultarInvitados, false);
}

//Clase invitado para guardar los invitados como objetos
class Invitado{
    constructor(nombre){
        this.nombre = nombre;
    }
}

//Crear array de objetos invitado
var arrayInvitados = [];

//Añadir invitados al evento
function añadirInvitado(e){
    //Evitar que se refresque la página
    e.preventDefault();

    //Seleccionamos el input del nombre del nuevo invitado que queremos añadir
    var inputInvitar = document.getElementById('invitar');
    //Valor del input invitar
    var nombre = inputInvitar.value;
    
    if(nombre == ''){
        //Si el campo está vacío no se puede añadir
        alert('El campo no puede estar vacío');
    }
    else if(arrayInvitados.map(x => x.nombre).includes(nombre)){
        //Si el nombre se repite con el de otro invitado no se puede añadir
        alert('No se puede repetir el nombre de un invitado');
    }
    else{
        //Creamos objeto invitado
        var invitado = new Invitado(nombre);
        console.log(invitado);
        //Añadimos el nuevo objeto al array de invitados
        arrayInvitados.push(invitado);
        console.log(arrayInvitados);
        //Llamamos a la funcion para pintar el nuevo invitado
        pintarInvitado(invitado, arrayInvitados.length - 1);
        //Borramos el nombre del formulario
        inputInvitar.value = "";

        //Recorremos todos los elementos checkbox
        for(var i = 0; i<document.getElementsByClassName('confirmar').length; i++){
            document.getElementsByClassName('confirmar')[i].addEventListener('click', confirmarInvitado);
        }

        //Recorremos los botones editar
        for(var j = 0; j<document.getElementsByClassName('editar').length; j++){
            document.getElementsByClassName('editar')[j].addEventListener('click', editarInvitado);
        }

        //Recorremos los botones eliminar
        for(var k = 0; k<document.getElementsByClassName('eliminar').length; k++){
            document.getElementsByClassName('eliminar')[k].addEventListener('click', eliminarInvitado);
        }
    }
    return true;
}


//Pintamos el nuevo invitado añadido
function pintarInvitado(invitado, id){
    //Seleccionamos el elemento ul
    var ul = document.getElementById('listaInvitados');
    //Creamos los elementos li, span, checkbox y botones
    var li = document.createElement('li');
    li.setAttribute('num', id);
    
    var span = document.createElement('span');
    span.innerHTML = invitado.nombre;
    span.setAttribute('class', 'span');
    
    var label = document.createElement('label');
    label.innerHTML = 'Confirmado';

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'confirmar');
    
    var editar = document.createElement('button');
    editar.innerHTML = 'Editar';
    editar.setAttribute('class', 'editar');
    
    var eliminar = document.createElement('button');
    eliminar.innerHTML = 'Eliminar';
    eliminar.setAttribute('class', 'eliminar');
    
    //Añadimos los nuevos elementos al elemento ul
    li.appendChild(span);
    li.appendChild(label);
    label.appendChild(checkbox);
    li.appendChild(editar);
    li.appendChild(eliminar);
    ul.appendChild(li);
}


//Confirmamos invitados
function confirmarInvitado(e){
    //Seleccionamos el elemento check que hemos pulsado
    var check = e.target; 
    var label = check.parentElement;
    var li = label.parentElement;
    //Si el elemento checkbox está seleccionado añade la clase 'responded' al elemento li
    if(!check.checked){
        li.setAttribute('class', '');
    }else{
        li.setAttribute('class', 'responded');
    }
}


//Editamos invitados
function editarInvitado(ev){
    //Seleccionamos el boton editar que hemos pulsado
    var editar = ev.target;

    //Seleccionamos el span navegando por los elementos
    var label = editar.previousSibling;
    var span = label.previousSibling;
    var nombreSpan = span.innerHTML;

    //Seleccionamos el valor del atributo num
    var li = span.parentNode;
    var num = li.getAttribute('num');

    if(editar.textContent == 'Editar'){
        //Creamos nuevo input
        var nuevoInput = document.createElement('input');
        nuevoInput.setAttribute('type', 'text');
        nuevoInput.setAttribute('id', 'nuevoInput');
        //Metemos en el input el nombre del invitado que ya teniamos en el span 
        nuevoInput.value = nombreSpan;
        
        //Reemplazamos el span por el nuevo input
        span.parentNode.replaceChild(nuevoInput, span);

        //Cambiamos el nombre del botón por 'Guardar'
        editar.innerHTML = 'Guardar';

        //Ponemos el foco en el input
        nuevoInput.focus();
    }
    else if (editar.textContent == 'Guardar'){
        //Seleccionamos el input
        var nuevoInput = document.getElementById('nuevoInput');
        //Cogemos el valor del input
        var nuevoNombre = nuevoInput.value;
        //Creamos nuevo span
        var nuevoSpan = document.createElement('span');
        //Asignamos el nuevo nombre del input en el nuevo span
        nuevoSpan.innerHTML = nuevoNombre;
        
        //Asignamos el nuevo nombre al objeto correspondiente
        arrayInvitados[num].nombre = nuevoNombre;
        
        //Reemplazamos el input por el nuevo span
        nuevoInput.parentNode.replaceChild(nuevoSpan, nuevoInput)
    
        console.log(arrayInvitados);
        
        //Cambiamos el nombre del botón por 'Editar'
        editar.innerHTML = 'Editar';
    }
}


//Ocultar invitados que no hayan confirmado
function ocultarInvitados(){
    //Seleccionamos los checkbox 'confimado'
    var confirmado = document.getElementsByClassName('confirmar');
    
    //Si el input 'ocultar invitados' está marcado, ocultamos los invitados que no hayan confirmado
    if(ocultar.checked){
        //Recorremos todos los invitados confirmados
        for(var i = 0; i<confirmado.length; i++){
            //Seleccionamos el elemento li
                var label = confirmado[i].parentElement;
                var li = label.parentElement;

            if(!confirmado[i].checked){
                li.style.display = 'none';
            }else{
                li.style.display = 'block';
            }
        }
    }
    //Si el input 'ocultar invitados' no está marcado, mostramos todos los invitados
    else{
        //Recorremos todos los invitados confirmados
        for(var i = 0; i<confirmado.length; i++){

            var label = confirmado[i].parentElement;
            var li = label.parentElement;
        
            li.style.display = 'block';
        }
    }
}


//Eliminamos invitados
function eliminarInvitado(ev){
    //Seleccionamos el botón eliminar que hemos pulsado
    var eliminar = ev.target;

    //Seleccionamos el elemento li
    var li = eliminar.parentNode;

    //Seleccionamos el nombre del invitado al que nos referimos
    var nombreInvitado = li.firstChild.innerHTML;

    //Mostramos mensaje de confirmacion
    var confirmar = confirm('¿Desea eliminar el invitado ' + nombreInvitado +'?');

    //Si aceptamos la confirmacion borramos el invitado
    if(confirmar == true){

        //Eliminamos el elemento li
        li.parentNode.removeChild(li);

        //Eliminamos del array de objetos de invitados el invitado eliminado
        var indexToDelete;
        arrayInvitados.filter((item, index) => {
            if(item.nombre === nombreInvitado){
                indexToDelete = index;
            }
        });

        arrayInvitados.splice(indexToDelete, 1); 
        console.log(arrayInvitados); 
    }
}