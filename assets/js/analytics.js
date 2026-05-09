/**
 * GA4 loader + outbound interaction events.
 * Set window.CELESTI_GA4_ID (before this script) to your Measurement ID, e.g. G-XXXXXXXXXX.
 */
(function () {
  var id = typeof window !== 'undefined' && window.CELESTI_GA4_ID;
  if (!id || typeof id !== 'string') return;
  id = id.trim();
  if (!/^G-[A-Za-z0-9]+$/.test(id)) return;

  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);

  document.addEventListener(
    'click',
    function (ev) {
      var el = ev.target && ev.target.closest && ev.target.closest('a[href]');
      if (!el) return;
      var href = el.getAttribute('href') || '';
      var payload = { event_category: 'engagement', transport_type: 'beacon', link_url: href };
      if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
        gtag('event', 'whatsapp_click', payload);
      } else if (href.indexOf('tel:') === 0) {
        gtag('event', 'phone_click', payload);
      } else if (/\.pdf(\?|$)/i.test(href) || href.indexOf('/assets/catalog/') !== -1) {
        gtag('event', 'catalog_pdf_click', payload);
      }
    },
    true
  );

  document.addEventListener(
    'submit',
    function (ev) {
      var f = ev.target;
      if (!f || f.tagName !== 'FORM') return;
      gtag('event', 'form_submit', {
        event_category: 'lead',
        form_action: f.getAttribute('action') || '',
        form_id: f.id || '',
      });
    },
    true
  );
})();
