var productos =["Carnazas de huesito","Carnazas de pollo","Carnaza de tocino","Carnaza de res","Premios chocolate","Bisquits","Colchón grande","Colchón mediano","Colchón pequeño"];
var descripcion =["Carnaza para perro", "Carnaza sabor pollo","Carnaza sabor tocino","Carnaza sabor res","Premios sabor chocolate", "Galletas deliciosas","Colchón 150cm x 100cm","Colchón 100cm x 75cm","Colchón de 75cm x 50cm"];
var precios =[45,5,5,5,60,35,420,310,200];

function init(){
	alert("CÁPARA SONIA ONLINE");

	var opcion = confirm("¿Aceptas los términos y condiciones");
	if(opcion){

		respuesta = prompt("Si tienes algún comentario puedes escribirnos:");
    	console.log("Mensaje: "+respuesta);
       	}
    else{
    	console.log("Cancelado");
    }
	horayfecha();

	$("#formulario_productos").on("submit",function(e)
    {
        guardarProducto(e);  
    });

    $("#botonComprar").hide();




    imprimirproductos();
    imprimirproductosentabla();
	
}

function muestraMensaje(){
	console.log("Holi");
}

/*function horayfecha(){
	//Obtenemos la fecha actual
	//dd-mm-aaaa | hh:mm:ss
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var hour = ("0" + (date.getHours())).slice(-2);              
    var minute = ("0" + (date.getMinutes())).slice(-2);
    var second = ("0" + (date.getSeconds())).slice(-2);
    var today = (day)+"-"+(month)+"-"+date.getFullYear()+" "+(hour)+":"+(minute)+":"+(second);
    //$('#fecha').val(today_archivo);
    console.log(today);
}*/

function horayfecha() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var day = today.getDate();
    var month = today.getMonth()+1;
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    day=checkTime(day);
    month=checkTime(month);
    document.getElementById("clock").innerHTML = day+ "-"+month+"-"+today.getFullYear()+" "+hr + " : " + min + " : " + sec + " " + ap;
    var time = setTimeout(function(){ horayfecha() }, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function guardarProducto(e)
{
    e.preventDefault(); //No se activará la acción predeterminada del evento

    //Si lo requerimos para usar ajax y enviar datos a backend, podemos leer todos los datos que estén en los campos
    //dentro del formulario
		//var formData = new FormData($("#formulario_productos")[0]);

    //Vamos a obtener los valores de nuestros input
    var nombre_producto = $("#nombre_producto").val();
    var precio_producto = $("#precio_producto").val();
    var descripcion_producto = $("#descripcion_producto").val();

    console.log("\nDatos de nuevo producto a ingresar: "+nombre_producto +" "+ descripcion_producto+ " "+ precio_producto);
    
    productos.push(nombre_producto);
    descripcion.push(descripcion_producto);
    precios.push(precio_producto);

    alert("Nuevo producto agregado");

    imprimirproductos();
}



function ingresarinicio()
{
    var nombre_producto = $("#nombre_producto").val();
    var precio_producto = $("#precio_producto").val();
    var descripcion_producto = $("#descripcion_producto").val();

    //Vamos a obtener los valores de nuestros input
    if(nombre_producto=="" || precio_producto=="" || descripcion_producto==""){
        alert("Revisa que todos los campos estén llenos :c");
    }
    else{

        console.log("\nDatos de nuevo producto a ingresar: "+nombre_producto +" "+ descripcion_producto+ " "+ precio_producto);
        
        productos.unshift(nombre_producto);
        descripcion.unshift(descripcion_producto);
        precios.unshift(precio_producto);

        alert("Nuevo producto agregado al inicio");

        imprimirproductos();
    }        
}

function borrarinicio()
{
    

    var opcionCancela = confirm("¿Deseas eliminar el primer producto?");
    if(opcionCancela){
        productos.shift();
        descripcion.shift();
        precios.shift();
        }
    else{
        console.log("\nProducto salvado :3");
    }

    imprimirproductos();
}

function borrarfinal()
{
    var opcionCancela = confirm("¿Deseas eliminar el último producto?");
    if(opcionCancela){
        productos.pop();
        descripcion.pop();
        precios.pop();
        }
    else{
        console.log("\nProducto salvado :3");
    }

    imprimirproductos();
}

function imprimirreversa()
{
    productos.reverse();
    descripcion.reverse();
    precios.reverse();

    imprimirproductos();
}

function imprimirproductos()
{
    console.log("\n\nBienvenido a Cápara Zonia. Aquí está nuestra lista de productos: ");
    for(i=0;i<productos.length;i++){
        console.log("\n"+(i+1)+".- "+productos[i]+" | "+descripcion[i] +" | $"+precios[i])
    }
}

function imprimirproductosentabla()
{
    for(i=0;i<productos.length;i++){
        /*document.getElementById("misProductos").innerHTML = "<td>"+productos[i]+"</td>"+
                                                            "<td>"+descripcion[i]+"</td>"+
                                                            "<td>"+precios[i]+"</td>";*/

        var fila=   "<tr>"+
                    '<td><button type="button" onclick="agregarProducto('+'\''+productos[i]+'\','+precios[i]+')" class="btn btn-info"><i class="fa fa-plus"></i></button></td>'+
                    "<td>"+productos[i]+"</td>"+
                    "<td>"+descripcion[i]+"</td>"+
                    "<td> $ "+precios[i]+".00 MXN.</td>"
                    "</tr>";
        $('#misProductos').append(fila);
        //"'+productos[i]+'",'+precios[i]+'
    }
}

var detalles=0;
var cont=0;

function agregarProducto(producto, precio){
    var cantidad=1;

    if(producto!=""){
        var subtotal=cantidad*precio;
        var fila='<tr class="filas" id="fila'+cont+'">'+
            '<td><button type="button" class="btn btn-danger" onclick="eliminarProducto('+cont+')"><i class="fa fa-close"></i></button></td>'+            
            '<td>'+producto+'</td>'+
            '<td><input type="hidden" name="precio[]" id="precio[]" value="'+precio+'">$ '+precio+'.00 MXN.</td>'+
            '<td><input type="number" name="cantidad[]" id="cantidad[]" value="'+cantidad+'"></td>'+
            '<td><span name="subtotal" id="subtotal'+cont+'">$ '+subtotal+'.00 MXN</span></td>'+
            '<td><button type="button" onclick="modificarSubtotales()" class="btn btn-info"><i class="fa fa-refresh"></i></button></td>'+
        '</tr>';
        cont++;
        detalles=detalles+1;
        $('#CompraProductos').append(fila);
        modificarSubtotales();
    }
    else{
        alert("Error al ingresar el producto, revisar los datos del artículo");
    }
}

function modificarSubtotales(){
    var prec = document.getElementsByName("precio[]");
    var cant = document.getElementsByName("cantidad[]");
    var sub = document.getElementsByName("subtotal");

    for(var i=0; i<cant.length; i++){
        var inpC=cant[i]; //Input
        var inpP=prec[i];
        var inpS=sub[i];

        inpS.value=inpC.value * inpP.value;
        document.getElementsByName("subtotal")[i].innerHTML = "$ "+inpS.value+".00 MXN";
    }

    calcularTotales();
}
 
function calcularTotales(){
    var sub = document.getElementsByName("subtotal");
    var total = 0.0;

    for(var i=0; i<sub.length; i++){
        total += document.getElementsByName("subtotal")[i].value;
    }
    $("#total").html("$ " + total + ".00 MXN.");
    evaluar();
}

function evaluar(){
    if(detalles>0){
        $("#botonComprar").show();
    }
    else{
        $("#botonComprar").hide();
        cont=0;
    }
}

function eliminarProducto(indice){
    $("#fila" + indice).remove();
    calcularTotales();
    detalles=detalles-1;
    evaluar();
}

function comprarProductos(){

    var direccion = prompt("Estás a punto de realizar tu compra por la cantidad de: "+$("#total").val()+". Ingresa tu dirección de envío.");
    alert("Gracias por tu compra :D Los productos serán enviados a: "+direccion);
}





init();
