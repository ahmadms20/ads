import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load InMobi CMP
    const host = 'ads-example.vercel.app';
    const consentScript = document.createElement('script');
    consentScript.async = true;
    consentScript.type = 'text/javascript';
    consentScript.src = `https://cmp.inmobi.com/choice/Q12MZ6FNVsvVA/${host}/choice.js?tag_version=V3`;
    document.head.appendChild(consentScript);

    // Load Geofeed for EU region detection
    const geoScript = document.createElement('script');
    geoScript.src = 'https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location/geofeed';
    document.head.appendChild(geoScript);

    // Attach callback
    window.geofeed = function (options) {
      const continent = options.continent.toString();

      const insertAdsJs = () => {
        const script1 = document.createElement('script');
        script1.src = '//fms.360yield.com/ow/bundles/live/pubgalaxy/publishers/123rfcom.min.js';
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = '//btloader.com/tag?o=5184339635601408&upapi=true';
        script2.async = true;
        document.body.appendChild(script2);
      };

      if (continent === 'EU') {
        let cnt = 0;
        const interval = setInterval(() => {
          cnt++;
          if (cnt === 600) clearInterval(interval);
          if (typeof window.__tcfapi === 'function') {
            clearInterval(interval);
            window.__tcfapi('addEventListener', 2, (tcData, success) => {
              if (success && ['tcloaded', 'useractioncomplete'].includes(tcData.eventStatus)) {
                const consentToStore = tcData?.purpose?.consents?.[1] || false;
                const consentToGoogleAds = tcData?.vendor?.consents?.[755] || false;
                if (!tcData.gdprApplies || (consentToStore && consentToGoogleAds)) {
                  insertAdsJs();
                }
              }
            });
          }
        }, 100);
      } else {
        insertAdsJs();
      }
    };
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <div id="123rfcom48535" style={{ width: 300, height: 600, background: '#f0f0f0', marginBottom: 20 }}></div>
      <div id="123rfcom48536" style={{ width: 300, height: 250, background: '#f0f0f0' }}></div>
    </div>
  );
}

export default App;
