var herramienta = "lapiz";
var tamano = 20;
var color_princ="#00FF00";
var x1;
var y1;

window.onload = function() {//controlador de eventos
	'use strict';
	document.getElementsByTagName("input")[4].value = tamano;
	document.getElementsByTagName("input")[5].value = color_princ;

	var c = document.getElementById("miCanvas");
	var ctx = c.getContext("2d");
	var dibujar = Boolean(false);
	
	c.onmouseup = function(e) {
		if (dibujar) {
			switch ( herramienta ) {

				case "lapiz":
				ctx.beginPath();
				break;

				case "linea":
				ctx.lineTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);
				//Estilo de trazo
				ctx.strokeStyle = color_princ;
				ctx.lineWidth = tamano;
				ctx.stroke();
				ctx.beginPath();
				break;
				case "texto":
				let texto = prompt("Texto a escribir:","");//muestra por pantalla mensajes de alerta
				if (texto!=null) {
					ctx.beginPath();
					ctx.font = "bold "+ tamano +"px sans-serif";
					ctx.textAlign = "left";
					ctx.fillStyle  = color_princ;
					ctx.lineWidth='1';
					ctx.fillText(texto, e.pageX - c.offsetLeft, e.pageY - c.offsetTop );
					ctx.fill();
					ctx.stroke();
				}
				break;
			}
		}
		dibujar = false;
	}

	c.onmousedown = function(e) {
		dibujar = true;

		if ( e.button == 2 ){
			dibujar = false;
		}

		switch (herramienta) {

			case "lapiz":
			ctx.beginPath();
			ctx.moveTo( e.pageX - c.offsetLeft, e.pageY - c.offsetTop );//retorna la distancia del elemento actual
			ctx.beginPath();
			ctx.lineJoin ="round";//permite la union entre lineas
			ctx.lineCap = 'round';
			break;

			case "linea":
			ctx.beginPath();
			ctx.moveTo( e.pageX - c.offsetLeft, e.pageY - c.offsetTop );
			ctx.lineJoin = "round";
			ctx.lineCap = 'round';
			break;

			case "borrador":
			ctx.beginPath();
			ctx.clearRect( e.pageX - c.offsetLeft, e.pageY - c.offsetTop, tamano, tamano );
			break;

		}
	}

	c.onmousemove = function(e) {

		if (dibujar) {
			switch (herramienta){
				case "lapiz":
				ctx.lineTo( e.pageX - c.offsetLeft, e.pageY - c.offsetTop );
				ctx.strokeStyle = color_princ;
				ctx.lineWidth = tamano;
				ctx.stroke();
				break;

				case "borrador":
				ctx.clearRect( e.pageX - c.offsetLeft, e.pageY - c.offsetTop, tamano, tamano );
				break;

			}
		}
	}
	c.onmouseover = function (e) {

		switch (herramienta){

			case "lapiz":
			c.style.cursor = "url('cursor/pencil.cur')0 32,default";//me permite personalizar el cursor
			break;

			case "borrador":
			c.style.cursor = "url('cursor/borrador.cur')"+ (-tamano)/2 +' '+ (-tamano)/2 +",default";
			break;

			case "linea":
			c.style.cursor = "crosshair";
			break;

			case "texto":
			c.style.cursor = "text";
			break;	
		}
	}
	
	c.onmouseleave = function() {
		var dibujar = false;
	}

	c.oncontextmenu = function(e) {
		return false;
	}
	//Me permite limpiar el canvas
	document.getElementById('limpiar').onclick = function(){
		ctx.clearRect(0, 0, c.width, c.height);
	};

	document.getElementById('descargar').onclick = function(){
		let imagen = c.toDataURL("image/png");//declara una variable de alcance local con ámbito de bloque
		let filename = prompt("Guardar como","");

		if (filename == null){//si el usuario presiono cancelar
			return false;
		}
		else if (filename == ""){//si el usuario preciono aceptar y no puso nombre al archivo
			this.download = "Sin título";
			this.href = imagen;//Usa la imagen del canvas
		}
		else{//Si el usuario presiono aceptar y puso un nombre al archivo
			this.download = filename;
			this.href = imagen;
		}
	};
};