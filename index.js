var fs = require("fs");



function chicle(directorio){

	this.directorio = directorio;
	
 	this.comprobe = function(dir){

		var result = fs.existsSync(dir);
		
		return result;
	
	}
	this.conectar = function(bd,callback){
		this.table =  bd;
	
		
		if(this.comprobe(directorio) == false){
			
			fs.mkdir("./bd",function(error){
				
				if(error){
					console.log("Error En Direcctorio de Datos");
				}else{
					console.log("Direcctorio Creado con exito");
					//comprobe file bd
					var bdExist = fs.existsSync('./'+directorio+'/'+bd+'.json');
					if(bdExist == false){
						var mi = new Object();
						
						mi =  [];
						
						fs.writeFile('./'+directorio+'/'+bd+'.json',JSON.stringify(mi),'utf8',function(error){
							if(error){
								console.log("Error al crear la base de datos");
							}else{
								console.log("Base de datos Creada con exito");
								callback(false,mi);
								
							}
						});
					}
				}
			});
		}else{
					console.log("Directorio Existe");
					
					var bdExist = fs.existsSync('./'+directorio+'/'+bd+'.json');
					
					if(bdExist == false){
						console.log("Creando base de datos");
						var mi = new Object();
						
						mi =  [];
						
						fs.writeFileSync('./'+directorio+'/'+bd+'.json',JSON.stringify(mi),'utf8');
						
					}else{
						console.log("Base de datos correcta");
										
						
						var data = fs.readFileSync('./'+this.directorio+'/'+this.table+'.json','utf-8');
						
							try{
								var json =  JSON.parse(data);
								
								var mi =  new Object();
								
								mi = [];
								
								callback(false,mi);
								
								if(json.length < 1){
									
								}
								
								 
							}catch(e){
								callback(true,[]);
							}
						
						
						
					}
			
		}
	
	}		
	this.consulta = function(callback){
		
		var data = fs.readFileSync('./'+this.directorio+'/'+this.table+'.json','utf-8');
		
		var retorno = JSON.parse(data);
		
		if(typeof callback == 'function'){
			
			if(typeof retorno == 'object'){
				callback(retorno);
			
			}
		}
	}
	this.agregar = function(add,callback){
		
		var data = fs.readFileSync('./'+this.directorio+'/'+this.table+'.json','utf-8');
		
		
				var json  = JSON.parse(data);
				
				if(json.length < 1){
					
					if(typeof add == "object"){
						
						var adding = new Object();
						if(json.length < 1){
							
							adding = add;
							add.id = 0;
							
							json[json.length] = adding;
							
							fs.writeFile('./'+this.directorio+'/'+this.table+'.json',JSON.stringify(json),'utf-8');
							
						}
						
					
					}
				
				}else{
					if(typeof add == "object"){
						
						var nameKey = Object.keys(json[0]);
						
						for(var i in nameKey){
							if(nameKey[i] == "id"){
									var finId = json[json.length-1].id;
									finId =  finId +1;
									console.log(finId);
									
									var adding = new Object();
									adding = add;
									add.id = finId;
									json[json.length] = adding;
									fs.writeFile('./'+this.directorio+'/'+this.table+'.json',JSON.stringify(json),'utf-8');
									
							}
						}
							
					}
				}
		
		
	}
}


var bd  = new chicle('./bd');


bd.conectar("Juan",function(error,info){
	/*
	bd.consulta(function(data){
		//console.log(data);
	});
	*/
	console.time("a");
	
	setInterval(function(){
			bd.agregar({"id":"10","nombre":"juan"},function(eror){
		
				//console.log(error);
		
			});
		
	
	},10);



	console.timeEnd("a");
});







