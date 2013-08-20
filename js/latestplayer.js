var latest_update_interval;
var latest_hover = false;
var latest_volume;

// Calculates seconds into a timestamp with leading zeroes
function timecalc(time) {

    var minutes = Math.round(Math.floor(time / 60));
    var seconds = Math.round(time - minutes * 60);
    var hours = Math.round(Math.floor(time / 3600));
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

};


// Updates the progress bar and timestap text
function latest_update(smooth) {

    if (smooth == false || smooth == undefined) {

        $('#latest_progress').css("width", Math.round(($("#latest_audio")[0].currentTime / $("#latest_audio")[0].duration) * $("#latest_progress_wrapper").width()) + "px");

    }

    else if (smooth == true) {

        $("#latest_progress").stop();
        $('#latest_progress').animate({width: Math.round(($("#latest_audio")[0].currentTime / $("#latest_audio")[0].duration) * $("#latest_progress_wrapper").width()) + "px"}, 250, 'easeOutExpo');

    };

    if (latest_hover == true) { }

    else if (latest_hover == false) {

        $("#latest_audio_time_current").html(timecalc($("#latest_audio")[0].currentTime));

    };

    if ($("#latest_audio")[0].ended == true) {

        window.clearInterval(window.latest_update_interval);

        $("#latest_audio_toggle").removeClass("latest_playing");

    }

    else { };

};


// Behaviour for the pause, play and stop buttons
function latest_toggle() {
    
    if ($("#latest_audio")[0].paused || $("#latest_audio")[0].ended) {

        $("#latest_audio")[0].play();

        $("#latest_audio_toggle").addClass("latest_playing");

        latest_update(false);
        latest_update_interval = setInterval(latest_update, 1000);

    }

    else {

        window.clearInterval(window.latest_update_interval);

        latest_update(false);
        latest_interval = null;

        $("#latest_audio")[0].pause();

        $("#latest_audio_toggle").removeClass("latest_playing");

    };

};


// Functions on document load
$(window).load(function () {

    latest_audio.volume = 0.8;

    $("#latest_audio_time_total").html(timecalc($("#latest_audio")[0].duration));

    // Bind for clicking on the audio player to track the audio time
    $('#latest_progress_wrapper').bind('click', function (e) {
        
        var x = Math.round((e.pageX - this.offsetLeft - (($(window).width() - $("#latest_progress_wrapper").width()) / 2)) / $("#latest_progress_wrapper").width() * $("#latest_audio")[0].duration);

        $("#latest_audio")[0].currentTime = x;

        window.clearInterval(window.latest_update_interval);
        latest_update(true);

        if ($("#latest_audio")[0].paused || $("#latest_audio")[0].ended) { }
        
        else {

            latest_update_interval = setInterval(latest_update, 1000);

        };

    });

    // Bind for mouse movement around the body to reset the current time
    $('body').bind('mousemove', function (e) {
        
        if (latest_hover == false) {

        }

        else if (latest_hover == true) {

            $("#latest_audio_time_current").html(timecalc($("#latest_audio")[0].currentTime));
            latest_hover = false;
            
            $('#latest_progress_line').stop();
            $('#latest_progress_line').animate({ opacity: 0 }, 250, 'easeOutExpo');

        };

    });

    // Bind for mouse movement around the audio player to show hovered timestamp
    $('#latest_progress_wrapper').bind('mousemove', function (e) {

        if (latest_hover == false) {

            latest_hover = true;

        }

        else { };

        var x = Math.round((e.pageX - this.offsetLeft - (($(window).width() - $("#latest_progress_wrapper").width()) / 2)) / $("#latest_progress_wrapper").width() * $("#latest_audio")[0].duration);

        $("#latest_audio_time_current").html(timecalc(x));

        $('#latest_progress_line').stop();
        $('#latest_progress_line').animate({ opacity: 1 }, 250, 'easeOutExpo');

        $("#latest_progress_line").css("left", (e.pageX - this.offsetLeft - (($(window).width() - $("#latest_progress_wrapper").width()) / 2)) + "px");
        
        e.stopPropagation();

    });

    // Enables the volume bar to be draggable within its parent
    $(function () {

        $("#volume_slider").draggable({ containment: "parent" });

    });

    // Changes audio volume depending on the location of the slider
    $("#volume_slider").bind("drag", function (e) {

        latest_volume = latest_audio.volume;

        latest_audio.volume = parseInt($("#volume_slider").css("left")) / 85;

        if (parseInt($("#volume_slider").css("left")) == 0) {

            $("#volume_button").addClass("volume_muted");

        }

        else {

            $("#volume_button").removeClass("volume_muted");

        };

    });

    // Bind for changing volume by clicking inside the volume bar
    $("#volume_bar").bind('click', function (e) {

        var x = Math.round(e.clientX - $(this).offset().left);

        latest_audio.volume = x / 100;

        $("#volume_slider").stop();
        $('#volume_slider').animate({ left: ((x / 100) * 85) + "px" }, 250, 'easeOutExpo');

    });

    // Bind for volume mute and unmute button
    $("#volume_button").bind('click', function (e) {

        if (latest_audio.volume == 0) {

            latest_audio.volume = latest_volume;

            $("#volume_slider").stop();
            $('#volume_slider').animate({ left: (latest_volume * 85) + "px" }, 250, 'easeOutExpo');

            if (latest_volume == 0) {

                $("#volume_button").addClass("volume_muted");

            }

            else {

                $("#volume_button").removeClass("volume_muted");

            };

        }

        else {

            latest_volume = latest_audio.volume;
            latest_audio.volume = 0;

            $("#volume_slider").stop();
            $('#volume_slider').animate({ left: "0px" }, 250, 'easeOutExpo');

            $("#volume_button").addClass("volume_muted");

        };

    });
    
});

// Function to add the latest episode menu overlaying image smoothly
var latest_image = new Image();

latest_image.src = 'img/episode100_latest_image.jpg';

latest_image.onload = function() {
	
	$("#menu_wrapper").css("background-color", "transparent");
	
};
