loadPlanet();
var missionConvoyObj = {};
var missionConvoyPlanetObj = {};
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
               _this.find("option").show()
               $.each(missionConvoyObj, function(a, c) {
                  _this.find("option[value='"+ $("[name='"+ a +"']").val() +"']").hide();
               });
               _this.find("option:selected").show()
            }
         });
      },
   })
   .done(function() {
      if (!$.isEmptyObject(missionConvoyObj)) {
         loadVehicles();
      } else {
         $("[data-vehicle-attr*=vehicle-box]").html('');
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
               let _thisTargetPlanetName = $(this).closest('.mission-traffic').find('select.mission-planet').find('option:selected').text().toLowerCase();
               $(this).html(function() {
                  $.each(data, function(index, val) {
                     let isDisabled = '';
                     let isDisabledTitle = '';
                     if (val.max_distance < _thisTargetPlanetDistance) {
                        isDisabled = 'disabled';
                        isDisabledTitle = val.name.toLowerCase() + ' can not travel to ' + _thisTargetPlanetName + ', due to its distance';
                     }
                     html += "\
                     <div class='radio "+ isDisabled +"' data-title='"+ isDisabledTitle +"' title='"+ isDisabledTitle +"'>\
                     <label><input type='radio' disable-distance='"+ isDisabled +"' class='mission-vehicles' data-max-distance='"+ val.max_distance +"' data-name='"+ val.name +"' data-total-no='"+ val.total_no +"' data-available-no='"+ val.total_no +"' "+ isDisabled +" data-related-planet-selector-opt='"+ _thisAttributePlanetBox +"' value='"+ val.speed +"' name='"+ _thisAttribute +"'><span class='opt-text'>"+ missionVehiclesLabel(val.name,val.total_no) +"</span></label>\
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
   updateOptionLabel(el);
   toggleSaveButton();
}

/**
* update option label
*/
function updateOptionLabel(el) {
   $.each($('[data-name]'), function(index, val) {
      if ( $(val).attr('disable-distance') === '' ) {
         $(val).removeAttr('disabled');
         $(val).closest('div.radio').removeClass('disabled');
      }
      $(val).closest('div.radio').attr('title',$(val).closest('div.radio').attr('data-title'));
      $(val).attr('data-available-no', $(val).attr('data-total-no'));
      $(val).closest('.radio').find('span.opt-text').css('text-decoration', '');
   });
   $.each(missionConvoyObj, function(index, val) {
      if (val.vehicle) {
         $.each($('[data-name="'+ val.vehicle.vehicle_name +'"]'), function(i, v) {
            if ($(v).attr('data-available-no') > 0) {
               $(v).attr('data-available-no', (parseInt($(v).attr('data-available-no'))-1));
            }
            if ( $(v).attr('data-available-no') == 0 && !$(v).is(':checked') ) {
               $(v).attr('disabled', 'true');
               $(v).closest('div.radio').addClass('disabled');
               $(v).closest('div.radio').attr('title', 'no more ' + val.vehicle.vehicle_name.toLowerCase() + ' left');
               $(v).closest('.radio').find('span.opt-text').css('text-decoration', 'line-through')
            }
         });
      }
   });
   $.each($('[data-name]'), function(index, val) {
      $(val).closest('.radio').find('span.opt-text').html(missionVehiclesLabel($(val).attr('data-name'),$(val).attr('data-available-no')));
   });
}

/**
* disable and enable save button
*/
function toggleSaveButton() {
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
      l.planet = $(this).val() ? $(this).find('option:selected').text() : '';
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
   // $("[data-vehicle-attr*=vehicle-box]").html('');
}

/**
* update dynamic label of vehicles
*/
function missionVehiclesLabel(...el) {
   return el[0] + ' (' + el[1] + ')';
}

/**
* submit and get result in new page
*/
function save() {
   let planetNamesArray = $.map( missionConvoyObj, function( n, i ) { return n.planet });
   let vehicleNamesArray = $.map( missionConvoyObj, function( n, i ) { return n.vehicle["vehicle_name"] });
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
            data: JSON.stringify({"token" : ""+ data.token +"","planet_names" : planetNamesArray,"vehicle_names" : vehicleNamesArray }),
            success: function(data) {
               if (data.status=='success') {
                  data["time_taken"] = timeTaken
                  localStorage.setItem('herokuapp_response', JSON.stringify(data));
                  window.location.href = "result.php";
               } else {
                  toastr["warning"]("something is not right, try again.","warning");
               }
            }
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