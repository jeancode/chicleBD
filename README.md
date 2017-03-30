# chicleBD
Base de datos sencilla basada en objetos y almacenada en objetos json 


# Inicializacion


Espesificar ruta donde se almacenaran las bases de datos


var bd = new chicle("./");


# conexion

Conectar con tabla de base de datos  si no existe se crea, si hay error devulve true


bd.conectar("juan",function(error)){

	console.log(error);
	if(error != true){
		//codigo de ejecucion

	}
}

# Agregar datos
 agregar datos llava primaria ID siempre activa si se le da un valor 
 se reconfugura a la sumatoria real de la llave primaria



bd.conectar("juan",function(error)){

	console.log(error);
	if(error != true){
		//codigo de ejecucion
		bd.agregar({"id":"10","nombre":"juan","apellido":"flores"});

	}
}


El resultado en base de datos seria  
	
	{"id":"0","nombre":"juan","apellid":"flores"}

# Consulta de datos


bd.conectar("juan",function(error)){

	console.log(error);
	if(error != true){
		//codigo de ejecucion
		bd.agregar({"id":"10","nombre":"juan","apellido":"flores"});
		
		bd.consulta(function(data){
			var bd = data;
			for(var i in data){
			   console.log(data[i].nombre);			
			   console.log(data[i].apellido);
			}
			
		});

	}
}


