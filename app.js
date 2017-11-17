jQuery(function ($) {
    $(".mdl-button.subject").click(function () {
        $("#addSubject").css("display", "block");
    });

    $(".mdl-button.structure").click(function () {
        $("#addStructure").css("display", "block");
    });

    $("nav.mdl-navigation > a").click(function (e) {
        e.preventDefault();
        let txt = e.currentTarget.attributes['data-name'].value;

        let gmarayaObj = {};

        GmarayaApi.LoadText(txt).then(data => {
            gmarayaObj = GmarayaApi.CreateGmarayaObj(data, 'he');

            const selector = document.querySelector('.load-text');
            selector.innerHTML = gmarayaObj.text.join(' ');

            //GmarayaApi.RunderMarkers(selector, savedMarkers);
            $(".mdl-layout__drawer").removeClass("is-visible");

        });
    });
});