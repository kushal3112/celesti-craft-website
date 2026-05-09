/**
 * Extra GA4 events (WhatsApp, tel, PDF, forms).
 * Requires the Google tag (gtag.js) in <head> on each page — do not load gtag again here.
 */
(function () {
  function safeGtag() {
    return typeof window.gtag === 'function' ? window.gtag : null;
  }

  document.addEventListener(
    'click',
    function (ev) {
      var gtagFn = safeGtag();
      if (!gtagFn) return;
      var el = ev.target && ev.target.closest && ev.target.closest('a[href]');
      if (!el) return;
      var href = el.getAttribute('href') || '';
      var payload = { event_category: 'engagement', transport_type: 'beacon', link_url: href };
      if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
        gtagFn('event', 'whatsapp_click', payload);
      } else if (href.indexOf('tel:') === 0) {
        gtagFn('event', 'phone_click', payload);
      } else if (/\.pdf(\?|$)/i.test(href) || href.indexOf('/assets/catalog/') !== -1) {
        gtagFn('event', 'catalog_pdf_click', payload);
      }
    },
    true
  );

  document.addEventListener(
    'submit',
    function (ev) {
      var gtagFn = safeGtag();
      if (!gtagFn) return;
      var f = ev.target;
      if (!f || f.tagName !== 'FORM') return;
      gtagFn('event', 'form_submit', {
        event_category: 'lead',
        form_action: f.getAttribute('action') || '',
        form_id: f.id || '',
      });
    },
    true
  );
})();
