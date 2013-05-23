
var Validation = function(e, form) {
	$(form).find('input[type="submit"]').attr('disabled', '');
	if (Modernizr.input.required && checkSafari()) { return true; }
	/* Ok, so on the more modern browsers input[required] works (as it should),
	but on < IE8 we need to use input[required=""] -- perfect case for using yepnope */

	$(form).find('input[required=""], input[required], textarea[required],textarea[required=""]').removeClass('invalid');
	var bOk = true;
	var count = 0;
	$(form).find('input[required=""], input[required], textarea[required],textarea[required=""]').each(function() {
		if ($(this).val() == '') {
			$(this).addClass('invalid');
			bOk = false;
		}
		if ($(this).attr('type') == 'checkbox' && $(this).is(':not(:checked)')) { $(this).addClass('invalid'); bOk = false; }
	});
	$(form).find('input.txtemail').each(function() {
		if (!bValidEmail($(this).val())) { $(this).addClass('invalid'); bOk = false; }
	})
	$(form).find('input[type="submit"]').removeAttr('disabled');
	return bOk;
}

var checkSafari = function() {
	return !($.browser.safari && (parseFloat($.browser.version, 10)) <= 534.52)
}

var bValidEmail = function(sEmail) {
	var rEmail = new RegExp("^([a-zA-Z0-9_\\-\\.\\']+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$", "gim");
	var sMatch = sEmail.match(rEmail);
	return (sMatch !== null);
}


$(document).ready(function() {
	$('form.checkform').submit(function(e) {
		return Validation(e, this);
	});
});