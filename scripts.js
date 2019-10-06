$(document).ready(function () {
    $(document).on('click', '#pin-button', function () {
        $(this).parent().parent().addClass("pinned");
    }
    );
    $(document).on('click', '#remove', function () {
        $(this).parent().parent().remove();
    }
    );

    $(document).on('click', '.iframe-launcher', function () {
        var yes = $(this);

        $(`<iframe src='${$(yes).parent().siblings("p").text()}' frameborder="0" allowfullscreen ></iframe><button class='remove-iframe'>Remove</button>`).insertAfter($(this).parent().parent()).prev().css({ "width": "100%", "height": "50vh" });
        $(this).parent().parent().remove();

    }
    );

    $(document).on('click', '.remove-iframe', function () {
        $(this).prev().remove();
        $(this).remove();
    });

    $(document).on('click', '.iframe-launcher', function () {
        var yes = $(this);

        $(`<iframe src='${$(yes).parent().siblings("p").text()}' frameborder="0" allowfullscreen ></iframe><button class='remove-iframe'>Remove</button>`).insertAfter($(this).parent().parent()).prev().css({ "width": "100%", "height": "50vh" });
        $(this).parent().parent().remove();

    }
    );
});
