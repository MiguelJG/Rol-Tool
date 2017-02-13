//recordar que algunos de los IDs pueden ser introduccidos por el javascript y no aparecer en el index. no olvidarlos...
////////////////////////////////////////////////////////////////////////////////
//-------------------dice roller--------------------------------
function iniciardados() {
  mesa.innerHTML = '';
  var cantidad = document.getElementById("Cantidaddedados").value;
  var tipo = document.getElementById("Tipodedado").value;
  if(tipo == 20 || tipo == 10 || tipo == 8 || tipo == 6 || tipo == 4 || tipo == 3){
    for (i = 0; i < cantidad; i++) {
        mesa.innerHTML += '<div class="dado'+ tipo +'">D'+tipo+' resultado --><span id="D'+i+'"></span></div>';
    }
    for(i = 0; i < cantidad; i++){
        lanzar(tipo,i);
    }
  } else{
      mesa.innerHTML = 'Tipo de dado no permitido';
  }
}

function lanzar(a, b) { 
  function critico() {
    alert('FELICIDADES, CRÍTICO!!!');
  }
  function pifia() {
    alert('Menuda putada, una pifia');
  }
  if(a == 20 || a == 10 || a == 8 || a == 6 || a == 4 || a == 3) {
    var numero = Math.floor(Math.random() * a)+1;
    var dado = document.getElementById('D'+ b +'');
    dado.innerHTML = ' '+numero+'';
    if(numero == 20) {
      critico();
    }
    else if(numero==1&&a==20) {
      pifia();
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//--------------------life counter---------------------------------
//utilizar un array al que se le introduzcan los datos para asi poder eliminarlos, o mantenerlos durante la ejecucion (que cierre la ventana de vidas, pero que al abrirla sigan ahi sin que se reinicie)
function ADDlife(ident){//añade 1 a la posicion del vector indicada y actualiza la ventana
  vidas[ident] += 1;
  actualizarlifecounter();
}

function SUBlife(ident){//resta 1 a la posicion del vector indicada y actualiza la ventana
  vidas[ident] -= 1;
  actualizarlifecounter();
}

function Deletelife(ident){//elimina la posicion del vector indicada y actualiza la ventana (respeta el orden)
  vidas[ident] = 'x';
  var temp = new Array();//vector temporal para no perder el orden de los contadores
  for (i in vidas){
    if(typeof vidas[i] == 'number'){
      temp.push(vidas[i]);
    }
  }
  vidas = [];
  for (i in temp){
    vidas.push(temp[i]);
  }
  actualizarlifecounter();
}

function actualizarlifecounter(){//actualiza la ventana con los valores del vector
  innerlifecounter.innerHTML = '';
  for (i in vidas){
    innerlifecounter.innerHTML += '<div id="vida'+i+'">'+vidas[i]+'  <button onClick="ADDlife('+i+')">+</button><button onClick="SUBlife('+i+')">-</button><button onClick="Deletelife('+i+')">x</button></div>';
  }
}

function addcounter(){//añade un contador mas
  vidas.push(0);
  actualizarlifecounter();
}

/////////////////////////////////////////////////////////////////////////////
//-----------------------------loot&xpcounter--------------
function Deletecounter(ident){//elimina la posicion del vector indicada y actualiza la ventana (respeta el orden)
  landxp[ident] = 'x';
  var temp = new Array();//vector temporal para no perder el orden de los contadores
  for (i in landxp){
    if(landxp[i] != 'x'){
      temp.push(landxp[i]);
    }
  }
  landxp = [];
  for (i in temp){
    landxp.push(temp[i]);
  }
  actualizarlootandxp();
}

function actualizarlootandxp(){//actualiza la ventana con los valores del vector
  innerlootandxpcounter.innerHTML = '';
  for (i in landxp){
    innerlootandxpcounter.innerHTML += '<div id="loot'+i+'" >  Loot-->'+landxp[i][0]+'  <button onClick="ADDloot('+i+')" class="lootandxp">+</button><button onClick="SUBloot('+i+')"class="lootandxp">-</button><div id="xp'+i+'" class="lootandxp">  XP-->'+landxp[i][1]+'  <button onClick="ADDxp('+i+')" class="lootandxp">+</button><button onClick="SUBxp('+i+')" class="lootandxp">-</button></div>  <button onClick="Deletecounter('+i+')" class="lootandxp">x</button></div>';
  }
}

function ADDloot(ident){//añade 1 a la posicion del vector indicada y actualiza la ventana
  landxp[ident][0] += 1;
  actualizarlootandxp();
}

function SUBloot(ident){//resta 1 a la posicion del vector indicada y actualiza la ventana
  landxp[ident][0] -= 1;
  actualizarlootandxp();
}
function ADDxp(ident){//añade 1 a la posicion del vector indicada y actualiza la ventana
  landxp[ident][1] += 1;
  actualizarlootandxp();
}

function SUBxp(ident){//resta 1 a la posicion del vector indicada y actualiza la ventana
  landxp[ident][1] -= 1;
  actualizarlootandxp();
}

function addlootandxpcounter(){//añade otro contador de loot y xp
    dato = [0,0]//loot,xp  posibilidad de añadir un tercer campo con el nombre del personaje o monstruo (iria al principio del display)
    landxp.push(dato);
    actualizarlootandxp();
}

///////////////////////////////////////////////////////////////
//----------------------------- munu---------------
var flagdiceroller = 0; //indica si ya se ha hecho
var flagLifecounter = 0;
var flagLootandXP = 0;
var flagcharachterdata = 0;
var flagajustes = 0;
var vidas = new Array();
var landxp = new Array();
function insertarhtml(nameID) {
  switch(nameID){
    case diceroller:{
        if(flagdiceroller== 0){
            nameID.innerHTML += '<div>  <label>Cantidad de dados que quiere lanzar<input id="Cantidaddedados" type="text" name="nombre" value="1"></label><br><br> <label>Tipo de dados que quiere lanzar (4 o 6 o 8 o 10 o 20)<select name="Razas" id="Tipodedado"><optgroup><option value="20">20</option><option value="10">10</option><option value="8">8</option><option value="6">6</option><option value="4">4</option><option value="3">3</option></optgroup></select></label></div><br><div>  <button id="buttondado" onClick="iniciardados()">Iniciar los dados</button></div><div id="mesa"></div>';
            flagdiceroller = 1;
        }
        else{
            nameID.innerHTML = '';
            flagdiceroller = 0;
        }
        break;
      }
    case Lifecounter:{
        if(flagLifecounter == 0){
            nameID.innerHTML += '<button onClick="addcounter()">Addcounter</button><div id="innerlifecounter"></div>';
            actualizarlifecounter();
            flagLifecounter = 1;
        }
        else{
            nameID.innerHTML = '';
            flagLifecounter = 0;
        }
        break;
      }
    case lootandxpcounter:{
        if(flagLootandXP == 0){
            nameID.innerHTML += '<button onClick="addlootandxpcounter()">Addcounter</button><div id="innerlootandxpcounter"></div>';
            actualizarlootandxp();
            flagLootandXP = 1;
        }
        else{
            nameID.innerHTML = '';
            flagLootandXP = 0;
        }
        break;
      }
    case charachterdata:{
        if(flagcharachterdata == 0){
            nameID.innerHTML += '<div id="dentroprueba">No implementado</div>';
            flagcharachterdata = 1;
        }
        else{
            nameID.innerHTML = '';
            flagcharachterdata = 0;
        }
        break;
      }
    case Ajustes:{
        if(flagajustes == 0){
            nameID.innerHTML += '<div id="dentroprueba">No implementado</div>';
            flagajustes = 1;
        }
        else{
            nameID.innerHTML = '';
            flagajustes = 0;
        }
        break;
      }
          
  }
  if(flag == 0){
    nameID.innerHTML += '<div id="dentroprueba">No implementado</div>';
    flag = 1;
  }
  else{
    nameID.innerHTML = '';
    flag = 0;
  }
}