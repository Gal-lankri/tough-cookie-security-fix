const tough = require('../lib/cookie');

function runSecurityFixTest() {
  // Test for CVE-2020-8201
    // The following test case is a PoC for CVE-2020-8201.
   // Create a new cookie jar
  const cookieJar = new tough.CookieJar(undefined, {
    rejectPublicSuffixes: false
  });
  
  // First cookie setting operation
  cookieJar.setCookie(
    'malicious=value; Domain=__proto__; Path=/polluted',
    'https://__proto__/admin',
    {},
    (err1) => {
      if (err1) {
        console.error('Error setting malicious cookie:', err1);
        return;
      }

      // Second cookie setting operation
      cookieJar.setCookie(
        'normal=value; Domain=example.com; Path=/normal',
        'http://example.com',
        {},
        (err2) => {
          if (err2) {
            console.error('Error setting normal cookie:', err2);
            return;
          }

          // Check if prototype pollution occurred
          const testObj = {};
          if (testObj["/polluted"] !== undefined) {
            console.log('Vulnerability exists - prototype was polluted');
          } else {
            console.log('Protection works - prototype pollution prevented');
          }

          // Get all cookies to verify behavior
          cookieJar.getCookies('http://example.com', (err3, cookies) => {
            if (err3) {
              console.error('Error getting cookies:', err3);
              return;
            }
            console.log('Stored cookies:', cookies);
          });
        }
      );
    }
  );
}

runSecurityFixTest()