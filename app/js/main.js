$(function(){
   $('.mob-menu').on('click', function () {
      $('.header__inner').slideToggle();
    });
    $('.nav__link').on('click', function () {
      $(this).closest('.nav__list').toggleClass('active');
    });
    $('.clanky .clanky__tab').on('click', function (event) {
      var id = $(this).attr('data-id');
      $('.news').find('.clanky__content').removeClass('tab-active').hide();
      $('.news .clanky__tabs').find('.clanky__tab').removeClass('active');
      $(this).addClass('active');
      $('#' + id)
        .addClass('tab-active')
        .fadeIn();
      return false;
    });
    var _gallery_loading = false;
  
    $(document).on('click', 'a[data-gallery]', function () {
      if (_gallery_loading) return;
      _gallery_loading = true;
    
      var mode = $(this).data('gallery');
      var url = '/app/ajax/gallery_ajax.php?mode=' + mode;
    
      if (mode == 1) {
        url += '&id=' + $(this).data('gallery-id');
      }
      if (mode == 2){
          url += '&searchtext=' + $(this).data('gallery-id');
        }
    
      $.getJSON(url, { format: 'json' })
        .done(function (e) {
          $(this).lightGallery({
            hash: false,
            share: false,
            dynamic: true,
            dynamicEl: e,
            download: false,
            backdropDuration: 500,
          });
        })
        .fail(function (e, textStatus, error) {
          alert('Nastala chyba při načítání galerie. Prosím zkuste to znovu.');
          console.error('getJSON failed, status: ' + textStatus + ', error: ' + error);
          console.error(e);
        })
        .always(function () {
          _gallery_loading = false;
        });
    
      return false;
    });
// end
})

tablesWrap();
iframesWrap();

// TABLE (wysiwyg editor) responsive
function tablesWrap() {
	var contentTables = document.querySelectorAll(".article__content table"),
      i;

	for (i = 0; i < contentTables.length; ++i) {
		contentTables[i].classList.add("table");

    var contentTableWrap = document.createElement("div");

    contentTableWrap.classList.add("table-responsive");

		contentTables[i].parentNode.insertBefore(contentTableWrap, contentTables[i]);

		contentTableWrap.appendChild(contentTables[i]);
	}
}