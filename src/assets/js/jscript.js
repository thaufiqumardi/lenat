var jsFunction = (function() {
  return {
    toggleModal: function(comp) {
      $(comp).modal('toggle');
    },
    datepicker: function() {
      $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        orientation: "auto auto",
        autoclose: true
      });
    },
    popover: function() {
      $('[data-toggle="popover"]').popover();
    },
    showAlert: function() {
      $('#alert').modal('show');
    }
  }
})(jsFunction||{})