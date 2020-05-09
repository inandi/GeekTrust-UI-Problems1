loadPlanet();
var missionConvoyObj = {};
var missionConvoyPlanetObj = {}
var selectedPlanet = [];

/**
* load all planet using planet API
*/
function loadPlanet(el='') {
	$.ajax({
		url: 'https://findfalcone.herokuapp.com/planets',
		type: 'GET',
		success: function(data) {
			// var arr = $('.mission-planet').map((i, e) => e.value).get();
			// let html = '';
			$.each($(".mission-planet"), function(i, v) {
				let _thisName = $(this).attr('name');
				let html = '';
				if ($.isEmptyObject(missionConvoyObj)) {
					$(this).html(function() {
						html = "<option value=''>- Select -</option>";
						$.each(data, function(index, val) {
							html += "<option value='"+ val.distance +"'>"+ val.name +"</option>";
						});
						return html;
					})
				} else if (el!=_thisName) {
					if (_thisName in missionConvoyObj) {

					} else {
						$(this).html(function() {
							html = "<option value=''>- Select -</option>";
							$.each(data, function(index, val) {
								if(  $.inArray(""+ val.distance +"", $('.mission-planet').map((i, e) => e.value).get()) < 0 ) {
									html += "<option value='"+ val.distance +"'>"+ val.name +"</option>";
								}
							});
							return html;
						})
					}
				}
			});
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	})
	.done(function() {
		loadVehicles();
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
function loadVehicles() {
	$.ajax({
		url: 'https://findfalcone.herokuapp.com/vehicles',
		type: 'GET',
		success: function(data) {
			$.each($("[data-vehicle-attr*=vehicle-box]"), function(i, v) {
				if ($(this).closest('.mission-traffic').find('select.mission-planet').val()) {
					let html = '';
					let _thisAttribute = $(this).attr('data-vehicle-attr');
					$(this).html(function() {
						$.each(data, function(index, val) {
							html += "\
							<div class='radio'>\
							<label><input type='radio' name='"+ val.speed +"-"+ _thisAttribute +"'>"+ val.name +" ("+ val.total_no +") </label>\
							</div>";
						});
						return html;
					})
				} else {
					let html = '';
					$(this).html(function() {
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
	let _thisName = $(this).attr('name');
	if ($(this).val()) {
		let l = {};
		l.planet = $(this).val() ? $(this).find('option:selected').text().toLowerCase() : ''
		missionConvoyPlanetObj[_thisName] = l
		missionConvoyObj = missionConvoyPlanetObj;
	} else {
		if (_thisName in missionConvoyObj) {
			delete missionConvoyObj[_thisName];
		}
	}
	console.log(missionConvoyObj)
	loadPlanet(_thisName);
});

function resetForm() {
	missionConvoyObj = {};
 	missionConvoyPlanetObj = {}
	loadPlanet();
}