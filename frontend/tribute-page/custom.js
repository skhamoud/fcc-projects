$(document).ready(function() {

    $('section').addClass('group');
    //======= videos & Iframe====
    var vidArray = ['SYhDZ72PE14', "SzP8e9b_OT8",'1oj8RXhf92g', "kktXOxEqYJc", "v6ZtgMFP-PI", "1SaRGO8a2pU"];
    var vidArea = $('.iframe-container, .modl-close');
    var iframe = $('iframe');

    function assignIframeSrc (index) {
            iframe.attr('src', function() {
                return "https://www.youtube.com/embed/" + vidArray[index] + "?modestbranding=1&disablekb=0&controls=2&fs=0&showinfo=1"; //players settings from ytp api
            })
    }
    $(".video-name").click(function(){
        // get id num to reference for iframe video src
        var vidNum = this.id.replace('video-name', '')-1;

        assignIframeSrc(vidNum);
        vidArea.toggleClass('hidden');
    })

    //stop and hide vid
    vidArea.click( function(){
        // stop the video
        iframe.attr('src', iframe.attr('src'));

        vidArea.toggleClass('hidden');
    })
    //====== END video and Iframe==========

})
