loadPlanet();
var missionConvoyObj = {};
var missionConvoyPlanetObj = {};
var missionConvoyVehicleObj = {};
var timeTaken = 0;
$('.reset-search-form').show();

/**
* load all planet using planet API
*/
function loadPlanet(el='') {
	$.ajax({
		url: 'https://findfalcone.herokuapp.com/planets',
		type: 'GET',
		success: function(data) {
			$.each($(".mission-planet"), function(i, v) {
				let _this = $(this);
				let html = '';
				if ($.isEmptyObject(missionConvoyObj)) {
					_this.html(function() {
						html = "<option value=''>- Select -</option>";
						$.each(data, function(index, val) {
							html += "<option value='"+ val.distance +"'>"+ val.name +"</option>";
						});
						return html;
					})
				} else if (el.attr('name') != _this.attr('name')) {
					if (_this.attr('name') in missionConvoyObj) {
						// el.val() ? _this.find("option").show() : '';
						$.each(missionConvoyObj, function(a, c) {
							// el.val() ? _this.find("option").show() : '';
							el.val() ? _this.find("option[value='"+ $("[name='"+ a +"']").val() +"']").hide() : '';
							el.val() ? _this.find("option[value='"+ _this.find('option:selected').val() +"']").show() : '';
							// console.log(_this.find('option:selected').val())
						});
					} else {
						_this.html(function() {
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
	})
	.done(function() {
      if (!$.isEmptyObject(missionConvoyObj)) {
       loadVehicles();
    }
 })
	.fail(function(...errorParam) {
		toastr["error"](
			(errorParam[2] ? errorParam[2].toLowerCase() : "something is not right") + ", try again.",
			(errorParam[1] ? (errorParam[1].toLowerCase()) : "error")
			);
	})
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
					let _thisAttributePlanetBox = $(this).attr('data-related-planet-selector');
					let _thisTargetPlanetDistance = $(this).closest('.mission-traffic').find('select.mission-planet').val();
					$(this).html(function() {
						$.each(data, function(index, val) {
							let isDisabled = '';
							if (val.max_distance < _thisTargetPlanetDistance) {
								isDisabled = 'disabled';
							}
							html += "\
							<div class='radio "+ isDisabled +"'>\
							<label><input type='radio' class='mission-vehicles' data-max-distance='"+ val.max_distance +"' data-name='"+ val.name +"'  data-total-no='"+ val.total_no +"' "+ isDisabled +" data-related-planet-selector-opt='"+ _thisAttributePlanetBox +"' value='"+ val.speed +"' name='"+ _thisAttribute +"'><span class='opt-text'>"+ missionVehiclesLabel(val.name,val.total_no) +"</span></label>\
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
	})
	.done(function() {
		$.each(missionConvoyObj, function(index, val) {
			if (val["vehicle"]) {
				$('input[name='+ val["vehicle"]["vehicle_selector"] +'][value="'+ val["vehicle"]["vehicle_speed"] +'"]').prop('checked', true).trigger('change');
			}
		});
	})
	.fail(function(...errorParam) {
		toastr["error"](
			(errorParam[2] ? errorParam[2].toLowerCase() : "something is not right") + ", try again.",
			(errorParam[1] ? (errorParam[1].toLowerCase()) : "error")
			);
	})
}

/**
* mission veihicle change event
*/
$(document).on('change', '.mission-vehicles', function(event) {
	event.preventDefault();
	let _this = $(this);
	let _thisName = _this.attr('name');
	let l = {};
	l.vehicle_selector = _thisName;
	l.vehicle_max_distance = _this.attr('data-max-distance');
	l.vehicle_name = _this.attr('data-name');
	l.vehicle_speed = _this.val();
	l.vehicle_total_no = _this.attr('data-total-no');
	missionConvoyObj[_this.attr('data-related-planet-selector-opt')]["vehicle"] = l;
	_this.closest('label').find('span.opt-text').html(missionVehiclesLabel(_this.attr('data-name'),(parseInt(_this.attr('data-total-no'))-1)));
	calculate(_this);
});

/**
* calculate the time
*/
function calculate(el) {
	timeTaken = 0;
	el.closest('.mission-traffic').attr('data-mission-traffice-section-value', (el.closest('.mission-traffic').find('select.mission-planet').val() / el.val()));
	$.each($('.mission-traffic[data-mission-traffice-section-value]'), function(index, val) {
		timeTaken = timeTaken + parseInt($(val).attr('data-mission-traffice-section-value'));
	});
	$('.time-text').html(timeTaken + ' hour(s)');
   toggleSaveButton();
}

/**
* disable and enable save button
*/
function toggleSaveButton(){
   let x = 0;
   $('.find-falcone-button').attr('disabled','true');
   missionConvoyObjCompleteVehicle = $.map( missionConvoyObj, function( n, i ) {
      if (n.vehicle) {
         return ++x;
      }
   });
   if ($('.mission-planet').length === missionConvoyObjCompleteVehicle.length) {
      $('.find-falcone-button').removeAttr('disabled');
   }
}

/**
* mission dropdown change event
*/
$(document).on('change', '.mission-planet', function(event) {
	event.preventDefault();
	let _this = $(this);
	let _thisName = _this.attr('name');
	if ($(this).val()) {
		let l = {};
		l.planet = $(this).val() ? $(this).find('option:selected').text().toLowerCase() : '';
		missionConvoyPlanetObj[_thisName] = l;
		missionConvoyObj = missionConvoyPlanetObj;
	} else {
		if (_thisName in missionConvoyObj) {
			delete missionConvoyObj[_thisName];
		}
	}
	loadPlanet(_this);
});

/**
* reset all elements in search form
*/
function resetForm() {
   $('.find-falcone-button').attr('disabled','true');
   missionConvoyObj = {};
   missionConvoyPlanetObj = {};
   timeTaken = 0;
   loadPlanet();
}

/**
* update dynamic label of vehicles
*/
function missionVehiclesLabel(...el){
	return el[0] + ' (' + el[1] + ')';
}
 
/**
* submit and get result in new page
*/
function save() {
	console.log(missionConvoyObj)
   let planetNamesArray = $.map( missionConvoyObj, function( n, i ) { return n.planet });
   let vehicleNamesArray = $.map( missionConvoyObj, function( n, i ) { return n.vehicle });
	if ($.isEmptyObject(missionConvoyObj)) {
		return true;
	} else {
		$.ajax({
			url: 'https://findfalcone.herokuapp.com/token',
			type: 'POST',
			headers: {"Accept": "application/json"},
		})
		.done(function(data) {
			$.ajax({
				url: 'https://findfalcone.herokuapp.com/find',
				type: 'POST',
				headers: {
					"Accept" : "application/json",
					"Content-Type" : "application/json"
				},
				data: JSON.stringify({"token" : ""+ data.token +"","planet_names" :["Donlon","Enchai","Pingasor","Sapir"],"vehicle_names" : ["Space pod","Space rocke","Space rocke","Space rocket"]}),
            // data: JSON.stringify({"token" : ""+ data.token +"","planet_names" :["Donlon","Enchai","Pingasor","Sapir"],"vehicle_names" : ["Space pod","Space rocke","Space rocke","Space rocket"]}),
				success: function(data) {
					if (data.status=='success') {
                  console.log(data)
                  localStorage.setItem('herokuapp_response', JSON.stringify(data));
                  window.location.href = "result.php";
               } else {
                  toastr["warning"]("something is not right, try again.","warning");
               }
            }
         })
			.done(function(data) {

			})
			.fail(function(...errorParam) {
				toastr["error"](
					(errorParam[2] ? errorParam[2].toLowerCase() : "something is not right") + ", try again.",
					(errorParam[1] ? (errorParam[1].toLowerCase()) : "error")
					);
			})
		})
		.fail(function(...errorParam) {
			toastr["error"](
				(errorParam[2] ? errorParam[2].toLowerCase() : "something is not right") + ", try again.",
				(errorParam[1] ? (errorParam[1].toLowerCase()) : "error")
				);
		})
	}
}