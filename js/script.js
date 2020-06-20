$(function(){
	var contador = 0;

	/*if($('#cdg-tkt').val())
		$('#cdg-tkt').val('');
	if($('#ganadoresQty').val())
		$('#ganadoresQty').val('');
	if($('.ticket-item').length > 1)
		$('.ticket-item').remove();*/

	$('#registrar').click(function(){
		if($('#cdg-tkt').val() === '' || $('#nm-cl').val() === ''){
			alert('Faltan Datos');
			return;
		}
		$('#tickets').append(
			'<div id="' + $('#nm-cl').val() + '-' +  $('#cdg-tkt').val() + '" class="card ticket-item">' 
				+ '<div numero="' + proximoNumero() + '" nombre="' + $('#nm-cl').val() + '" '
				+ 'ticket="' + $('#cdg-tkt').val() + '" '
				+ 'class="card-body ticket">' 
					+ $('#nm-cl').val() + ' - ' + $('#cdg-tkt').val()
					+ '<button type="button" class="close">'
						+ '<span aria-hidden="true" cierra="'
						+ $('#nm-cl').val() + '-' + $('#cdg-tkt').val()
						+ '">&times;</span>'
					+ '</button>'
				+ '</div>' 
			+ '</div>'
		);
		
		eventos();
		$('#nm-cl').val('');
		$('#cdg-tkt').val('');
	});

	function aleatorio(){
		var max = $('.ticket').length;
		return parseInt(Math.random()*(max) + 1);
	}

	function proximoNumero(){
		var num = $('.ticket').length;

		if(typeof num === 'undefined')
			num = 0;

		return ++num;
	}

	function eventos(){
		$('.close span').click(function(){
			$('#' + $(this).attr('cierra')).remove();
		});
	}

	function validarRepetidos(nuevo){
		var band = false;
		$('#ganador').find('h2').each(function(){
			console.log($(this).find('strong').text() + ' : ' + nuevo);
			if($(this).find('strong').text().includes(nuevo)){
				console.log('true');
				band = true;
			}
		});
				console.log('false');
		return band;
	}

	function getGanadores(){
		var num = aleatorio();
		var ganador = $('div[numero="' + num +'"]');

		do{
			num = aleatorio();
			ganador = $('div[numero="' + num +'"]');
		}while(validarRepetidos(ganador.attr('ticket')));

		contador++;
		$('#ganador').append(
			'<h2 class="d-block py-2 border text-center">' 
				+ '<strong>'
					+ '<h4 class="d-inline">' + contador + ' - </h4>'
					+ ganador.attr('ticket')
				+ '</strong>'
			+ '</h2>'
		);

	}

	$('#sortear').click(function(){
		if($('.ticket').length <= 1){
			alert('Ingrese mas clientes para el sorteo');
			return;
		}
		if($('#ganadoresQty').val() === ''){
			alert('Indique la cantidad de ganadores');
			return;
		}
		if($('#ganadoresQty').val() > $('.ticket').length){
			alert('La cantidad de ganadores no puede ser mayor a la cantidad de tickets registrados');
			return;
		}
		$('#spinner').show();
		contador = 0;
		var cantidadGanadores = $('#ganadoresQty').val();
		setTimeout(function(){
			$('#spinner').hide();
			for(var i = 0; i < cantidadGanadores; i++){
				getGanadores();
			}
		}, 2000);
		
		$('#mostrar').trigger('click');

	});

	$('#cierra-modal').click(function(){
		$('#ganador').html('');
	});

});
