$(document).ready(function () {
    $(document).on('click', '#pin-button', function () {
      $(this).parent().addClass("pinned");
    }
    );
    $(document).on('click', '#remove', function () {
        $(this).parent().remove();
      }
      );

});

