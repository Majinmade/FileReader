/**
 * http://usejsdoc.org/
 */
var refreshId = 0;

var follow = true;

var started = false;

$(function() {
	$('#startStop').on('click', function(e) {
		if(started) {
			started = false;
			$('#startStop').text('Start')
			clearInterval(refreshId);
		} else {
			started = true;
			$('#startStop').text('Stop')
			refreshId = setInterval(test, 1000);
		}
	});
});

$(function() {
	$('#stop').on('click', function(e) {
		clearInterval(refreshId);
	});
});

$(function() {
	$('#follow').on('click', function(e) {
		if(follow) {
			follow = false;
			$('#follow').text('Follow')
		} else {
			follow = true;
			$('#results').scrollTop($('#results')[0].scrollHeight);
			$('#follow').text('Stop Follow')
		}
	});
});

function test() {
	$.get('/log', function(data) {
		$('#results').val(data);
		if(follow) {
			$('#results').scrollTop($('#results')[0].scrollHeight);
		}
	});
}
