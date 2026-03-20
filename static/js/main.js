/* ========================================
   WeatherWatch – Main JavaScript (jQuery)
   ======================================== */

$(document).ready(function () {

  // ========== CLOCK ==========
  function updateClock() {
    var now = new Date();
    var timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    $('#clock').text(timeStr);
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ========== DARK-MODE TOGGLE ==========
  $('#modeToggle').on('click', function () {
    $('body').toggleClass('dark-mode');
    $(this).toggleClass('night');
  });

  // ========== FORM VALIDATION (jQuery) ==========

  // Validate email format
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Show validation error
  function showError($field, msg) {
    var $err = $field.next('.validation-error');
    if ($err.length === 0) {
      $err = $('<div class="validation-error"></div>');
      $field.after($err);
    }
    $err.text(msg).slideDown(200);
    $field.addClass('is-invalid');
  }

  // Clear validation errors
  function clearErrors($form) {
    $form.find('.validation-error').slideUp(200);
    $form.find('.is-invalid').removeClass('is-invalid');
  }

  // ---------- Lat/Long form ----------
  $('#latlongForm').on('submit', function (e) {
    var valid = true;
    clearErrors($(this));

    var lat = $('#latitude').val().trim();
    var lng = $('#longitude').val().trim();
    var email = $('#recipient_email_latlong').val().trim();

    if (lat === '') {
      showError($('#latitude'), 'Latitude is required.');
      valid = false;
    } else if (isNaN(lat) || lat < -90 || lat > 90) {
      showError($('#latitude'), 'Latitude must be between -90 and 90.');
      valid = false;
    }

    if (lng === '') {
      showError($('#longitude'), 'Longitude is required.');
      valid = false;
    } else if (isNaN(lng) || lng < -180 || lng > 180) {
      showError($('#longitude'), 'Longitude must be between -180 and 180.');
      valid = false;
    }

    if (email === '') {
      showError($('#recipient_email_latlong'), 'Email address is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError($('#recipient_email_latlong'), 'Please enter a valid email address.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  // ---------- City form ----------
  $('#cityForm').on('submit', function (e) {
    var valid = true;
    clearErrors($(this));

    var city = $('#city_name').val().trim();
    var email = $('#recipient_email_city').val().trim();

    if (city === '') {
      showError($('#city_name'), 'City name is required.');
      valid = false;
    } else if (city.length < 2) {
      showError($('#city_name'), 'Please enter a valid city name.');
      valid = false;
    }

    if (email === '') {
      showError($('#recipient_email_city'), 'Email address is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError($('#recipient_email_city'), 'Please enter a valid email address.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  // Clear error on input focus
  $('input.form-control').on('focus', function () {
    $(this).removeClass('is-invalid');
    $(this).next('.validation-error').slideUp(200);
  });

  // ========== LEAFLET MAP ==========
  if ($('#map').length) {
    var map = L.map('map').setView([20, 78], 3);   // default: India center
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker;

    map.on('click', function (e) {
      if (marker) map.removeLayer(marker);
      marker = L.marker(e.latlng).addTo(map);

      var lat = e.latlng.lat.toFixed(6);
      var lng = e.latlng.lng.toFixed(6);

      $('#map_lat').val(lat);
      $('#map_lng').val(lng);
      $('#hidden_lat').val(lat);
      $('#hidden_lng').val(lng);

      // Fetch quick weather popup
      fetchMapWeather(lat, lng);
    });

    // Check weather for map selection
    $('#check_map_weather').on('click', function () {
      var email = $('#map_email').val().trim();

      if (!email) {
        alert('Please enter an email address for alerts.');
        return;
      }
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!$('#hidden_lat').val()) {
        alert('Please click on the map to select a location first.');
        return;
      }

      $('#hidden_email').val(email);
      $('#map_form').submit();
    });

    function fetchMapWeather(lat, lng) {
      $.ajax({
        url: '/map-weather',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ latitude: lat, longitude: lng }),
        success: function (data) {
          var popup = '<div class="text-center">' +
            '<div style="font-size:2rem">' + data.emoji + '</div>' +
            '<strong>' + (data.temperature || 'N/A') + '</strong><br>' +
            '<span>' + data.location.split(',')[0] + '</span><br>' +
            '<span>' + (data.will_rain ? '🌧️ Rain expected' : '☀️ No rain') + '</span>' +
            '</div>';
          marker.bindPopup(popup).openPopup();
        },
        error: function () {
          console.error('Error fetching map weather');
        }
      });
    }
  }

  // ========== CONFIRMATION MESSAGES ==========
  // Auto-dismiss flash alerts after 6 seconds
  setTimeout(function () {
    $('.alert-dismissible').fadeOut(500);
  }, 6000);
});
