loadPlanet();
loadVehicles();

/**
* load all planet using planet API
*/
function loadPlanet(){
	let html = '';
	$.ajax({
		url: 'https://findfalcone.herokuapp.com/planets',
		type: 'GET',
		success: function(data){
			$(".mission-planet").html(function(){
				html = "<option value=''>- Select -</option>";
				$.each(data, function(index, val) {
					html += "<option value='"+ val.distance +"'>"+ val.name +"</option>";
				});
				return html;
			})
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	})
	.done(function() {
		// console.log("success");
	})
	.fail(function() {
		// console.log("error");
	})
	.always(function() {
		// console.log("complete");
	});
}

/**
* load all vehicle using vehicle API
*/
function loadVehicles(){
	$.ajax({
		url: 'https://findfalcone.herokuapp.com/vehicles',
		type: 'GET',
		success: function(data){
			$.each($("[data-vehicle-attr*=vehicle-box]"), function(index, val) {
				console.log($(this).closest('.mission-traffic').find('select.mission-planet'))
				console.log($(this).closest('.mission-traffic').find('select.mission-planet').val())
				if ($(this).closest('.mission-traffic').find('select.mission-planet').val()) {
					let html = '';
					let _thisAttribute = $(this).attr('data-vehicle-attr');
					$(this).html(function(){
						$.each(data, function(index, val) {
							html += "\
							<div class='radio'>\
							<label><input type='radio' name='"+ val.speed +"-"+ _thisAttribute +"'>"+ val.name +" ("+ val.total_no +") </label>\
							</div>";
						});
						return html;
					})
				}
			});
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	})
	.fail(function() {
		// console.log("error");
	})
	.always(function() {
		// console.log("complete");
	});
}

$(document).on('change', '.mission-planet', function(event) {
	event.preventDefault();
	loadVehicles();
});