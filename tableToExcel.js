function aleatorio() {
	var minimo=1;
	var maximo=6;
	var decimales=0;
    var precision = Math.pow(10, decimales);
    minimo = minimo*precision;
    maximo = maximo*precision;
    return Math.floor(Math.random()*(maximo-minimo+1) + minimo) / precision;
}

function re(num, decimales = 4) {
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}

$(document).ready(function(){
  var nombres = [];
  var edades = [];
  var masas = [];
  var sexos = []; 
  var vasos = [];
	$("#crearj").click(function() {
    $("#infor").hide();
    $('#crearj').attr("disabled", true);
    $("#info").append("<div class='form-group'><label>Ingresa el nombre</label><input type='text' class='nombre form-control'><label>Sexo</label><select name='sexo' class='sexo'><option value='m'>Masculino</option><option value='f'>Femenino</option></select><br><label>Ingresa su peso en Kg</label><input type='number' class='masa form-control'><label>Ingresa su edad</label><input type='number' class='edad form-control'>");
    $("#info").append("<input type='button' name='Crear' value='Crear' id='crear' class='btn btn-info'></div>");
    $("#crear").click(function() {
    var nombre = $(".nombre").val();
    var sexo = $(".sexo").val();
    var masa = $(".masa").val();
    var edad = $(".edad").val();
    nombres.push(nombre);
    edades.push(edad);
    masas.push(masa);
    sexos.push(sexo);
    $(".nombre").val("");
    $(".sexo").val("");
    $(".masa").val("");
    $(".edad").val("");
    alert("Jugador "+ nombres.length +" creado exitosamente");
    if(nombres[2] != undefined){
       $("#terminar").html("<br><input type='button' name='Terminar' value='Terminar' id='ter' class='btn btn-danger'></div>");
      
     
    }
    $("#ter").click(function() {
        $('#crearj').attr("disabled", true);
        $("#alcohol").append("<div class='form-group'><label>Ingresa volumen de la bebida alcohólica</label><input type='number' class='volumen form-control'><label>Densidad a tomar</label><input type='number' class='densidad form-control'><label>Ingresa grados de alcohol de la bebida</label><input type='number' class='grados form-control'>");
        $("#alcohol").append("<input type='button' name='Jugar' value='Jugar' id='jugar' class='btn btn-warning'></div>");

         $("#jugar").click(function() {
          $("#cuerpo").html("");
          var cantAlc = [];
          var volumen = $(".volumen").val();
          var densidad = $(".densidad").val();
          var grados = $(".grados").val();
          var masaalcohol = (volumen * densidad * grados)/100;
          var bol = true;
          for (var i = 0; i <nombres.length; i++) {
            var aux = 0;
            cantAlc[i] = parseFloat(aux);
            vasos[i] = parseFloat(aux);
          }
          var index = 0;
          while(bol){
            var tasaAl = 0;
            for (var i = 0; i <nombres.length; i++) {

              var nAleatorio = aleatorio();
              switch(nAleatorio){
                case 1:alert("Toma 1 vaso " + nombres[i]);
                if(sexos[i] == "m"){
                  tasaAl = masaalcohol / (masas[i]*0.70); 
                }
                else{
                  tasaAl = masaalcohol / (masas[i]*0.60); 
                }
                cantAlc[i] = cantAlc[i] + parseFloat(re(tasaAl));
                vasos[i] = vasos[i]+1;
                break;
                case 2:alert("Toma 2 vasos " + nombres[i]);
                if(sexos[i] == "m"){
                  tasaAl = (masaalcohol*2) / (masas[i]*0.70); 
                  console.log(tasaAl);
                }
                else{
                  tasaAl = (masaalcohol*2) / (masas[i]*0.60); 
                }
                cantAlc[i] = cantAlc[i] + parseFloat(re(tasaAl));
                vasos[i] = vasos[i]+2;
                break;
                case 3:alert("Pone 1 vaso " + nombres[i]);
                if(sexos[i+1] == "m"){
                  tasaAl = masaalcohol / (masas[i+1]*0.70); 
                  console.log(tasaAl);
                }
                else{
                  tasaAl = masaalcohol / (masas[i+1]*0.60); 
                }
                cantAlc[i+1] = cantAlc[i+1] + parseFloat(re(tasaAl));
                vasos[i+1] = vasos[i+1]+1;
                break;
                case 4:alert("Pone 2 vasos " + nombres[i]);
                if(sexos[i+1] == "m"){
                  tasaAl = (masaalcohol*2) / (masas[i+1]*0.70); 
                }
                else{
                  tasaAl = (masaalcohol*2) / (masas[i+1]*0.60); 
                }
                cantAlc[i+1] = cantAlc[i+1] + parseFloat(re(tasaAl));
                vasos[i+1] = vasos[i+1]+2;
                break;
                case 5:alert("Todos Toman");
                for (var j = 0; j <nombres.length; j++) {
                  if(sexos[i] == "m"){
                  tasaAl = masaalcohol / (masas[j]*0.70); 
                  }
                  else{
                  tasaAl = masaalcohol / (masas[j]*0.60); 
                 }
                  cantAlc[i] = cantAlc[i] + parseFloat(re(tasaAl));
                  vasos[i] = vasos[i]+1;
                }
                break;
                case 6:alert("Nadie Toma");
                break;
              }
              var tr = `<tr>
              <td>`+index+`</td>
              <td>`+nombres[i]+`</td>
              <td>`+cantAlc[i]+`</td>
              <td>`+vasos[i]+`</td>
              </tr>`;
          $("#cuerpo").append(tr);
              //Hasta donde aguanta una persona
              if(cantAlc[i] > 3){
                alert(nombres[i] + " Está Borracho!!!!!!!");
                nombres.splice(i, 1);
                masas.splice(i, 1);
                edades.splice(i, 1);
                sexos.splice(i, 1);
              }
              
              if(nombres.length == 1){
                alert("Todos se emborracharon...");
                alert(nombres[nombres.length-1]  + " Has Ganado")
                bol = false;
              }
              index ++;
            }

          }
        
          
        
    });
      });
   


	});


});
});

