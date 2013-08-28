var episode_update_interval;
var episode_hover = false;

// Calculates seconds into a timestamp with leading zeroes
function timecalc(time) {

    var minutes = Math.round(Math.floor(time / 60));
    var seconds = Math.round(time - minutes * 60);
    var hours = Math.round(Math.floor(time / 3600));
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

};


// Updates the progress bar and timestap text
function episode_update(smooth) {

    if (smooth == false || smooth == undefined) {

        $('#episode_audio_progress').css("width", Math.round(($("#episode_audio")[0].currentTime / $("#episode_audio")[0].duration) * $("#episode_audio_progress_wrapper").width()) + "px");

    }

    else if (smooth == true) {

        $("#episode_audio_progress").stop();
        $('#episode_audio_progress').animate({width: Math.round(($("#episode_audio")[0].currentTime / $("#episode_audio")[0].duration) * $("#episode_audio_progress_wrapper").width()) + "px"}, 250, 'easeOutExpo');

    };

    if (episode_hover == true) { }

    else if (episode_hover == false) {

        $("#episode_audio_time span").html(timecalc($("#episode_audio")[0].currentTime));

    };

    if ($("#episode_audio")[0].ended == true) {

        window.clearInterval(window.episode_update_interval);

        $("#episode_audio_toggle").removeClass("episode_playing");

    }

    else { };

};


// Behaviour for the pause, play and stop buttons
function episode_toggle() {
    
    if ($("#episode_audio")[0].paused || $("#episode_audio")[0].ended) {

        $("#episode_audio")[0].play();

        $("#episode_audio_toggle").addClass("episode_playing");

        episode_update(false);
        episode_update_interval = setInterval(episode_update, 1000);

    }

    else {

        window.clearInterval(window.episode_update_interval);

        episode_update(false);
        episode_interval = null;

        $("#episode_audio")[0].pause();

        $("#episode_audio_toggle").removeClass("episode_playing");

    };

};


// Functions on document load
$(window).ready(function () {

    $("#episode_audio_toggle").bind('click', episode_toggle);

    setTimeout(function(){ 

        $("#episode_audio_time_total").html(timecalc($("#episode_audio")[0].duration));

    }, 500);

    // Bind for clicking on the audio player to track the audio time
    $('#episode_audio_progress_wrapper').bind('click', function (e) {
        
        var x = Math.round((e.pageX - this.offsetLeft - (($(window).width() - $("#episode_audio_progress_wrapper").width()) / 2)) / $("#episode_audio_progress_wrapper").width() * $("#episode_audio")[0].duration);

        $("#episode_audio")[0].currentTime = x;

        window.clearInterval(window.episode_update_interval);
        episode_update(true);

        if ($("#episode_audio")[0].paused || $("#episode_audio")[0].ended) { }
        
        else {

            episode_update_interval = setInterval(episode_update, 1000);

        };

    });

    // Bind for mouse movement around the body to reset the current time
    $('#episode_audio_player, body').bind('mousemove', function (e) {
        
        if (episode_hover == false) {

        }

        else if (episode_hover == true) {

            $("#episode_audio_time span").html(timecalc($("#episode_audio")[0].currentTime));
            episode_hover = false;

        };

    });

    // Bind for mouse movement around the audio player to show hovered timestamp
    $('#episode_audio_progress_wrapper').bind('mousemove', function (e) {

        if (episode_hover == false) {

            episode_hover = true;

        }

        else { };

        $("#episode_audio_time span").html(timecalc($("#episode_audio")[0].currentTime));
        
        e.stopPropagation();

    });
    
});