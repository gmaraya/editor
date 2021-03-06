﻿jQuery(function ($) {
    $(".mdl-button.subject").click(function () {
        $("#addSubject").css("display", "block");
    });

    $(".mdl-button.structure").click(function () {
        $("#addStructure").css("display", "block");
    });

    $(".dafyomi").click(function(e){
        let txt = 'Makkot.11a';  
        let gmarayaObj = {};
        
                GmarayaApi.LoadText(txt).then(data => {
                    gmarayaObj = GmarayaApi.CreateGmarayaObj(data, 'he');
        
                    const selector = document.querySelector('.load-text');
                    selector.innerHTML = gmarayaObj.text.join(' ');
        
        
                    $("#mainTitle").html(e.currentTarget.innerText);
        
                    //GmarayaApi.RunderMarkers(selector, savedMarkers);
                    $(".mdl-layout__drawer").removeClass("is-visible");
                    $(".mdl-layout__obfuscator").removeClass("is-visible");
                });
    });
    
    $("nav.mdl-navigation > a").click(function (e) {
        e.preventDefault();
        if (!e.currentTarget.attributes['data-name'])
            return;

        let txt = e.currentTarget.attributes['data-name'].value;

        let gmarayaObj = {};

        GmarayaApi.LoadText(txt).then(data => {
            gmarayaObj = GmarayaApi.CreateGmarayaObj(data, 'he');

            const selector = document.querySelector('.load-text');
            selector.innerHTML = gmarayaObj.text.join(' ');

            $("#mainTitle").html(e.currentTarget.innerText);

            //GmarayaApi.RunderMarkers(selector, savedMarkers);
            $(".mdl-layout__drawer").removeClass("is-visible");
            $(".mdl-layout__obfuscator").removeClass("is-visible");
        });
    });
});