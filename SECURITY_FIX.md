# Tough-Cookie Security Fix for CVE-2023-26136

This repository contains a security fix for tough-cookie version 2.5.0, addressing the prototype pollution vulnerability (CVE-2023-26136).

## Vulnerability Overview

The original tough-cookie v2.5.0 is vulnerable to prototype pollution via cookie manipulation. This could allow attackers to modify the Object prototype, potentially leading to:
- Authentication bypasses
- Security control circumvention
- Property injection attacks

## Testing the Vulnerability

1. First, test the vulnerability in the original package:
```bash
npm install tough-cookie@2.5.0 && node index.js
```
# Output should show: EXPLOITED SUCCESSFULLY


# Then test with the patched version:
```bash
install ./tough-cookie-2.5.0-PATCHED.tgz && node index.js
```
# Output should show: EXPLOIT FAILED

# Applying the Patch

Clone the original tough-cookie repository:

```bash 
clone https://github.com/salesforce/tough-cookie.git
cd tough-cookie
git checkout v2.5.0
```
Apply the patch using:
```bash
apply --ignore-whitespace changes.diff
```

# Running Tests

Install dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```
The test suite includes a new test case specifically for CVE-2023-26136 in test/cookie_jar_test.js, 
which verifies that prototype pollution attempts are prevented.

Test Output
The test suite should pass with output similar to
```bash
Copy> vows test/*_test.js --spec
✓ OK » XX honored (X.XXs)
```

Verification Files
1. changes.diff
Contains the security fix changes compared to tough-cookie 2.5.0. Key changes include:

Using Object.create(null) to prevent prototype pollution
Added test cases to verify the fix

2. index.js
Demonstration file showing:

Exploitation success on vulnerable version
Failed exploitation attempt on patched version

3. Patched Package
The patched version is available as tough-cookie-2.5.0-PATCHED.tgz
Repository Information

Original version: tough-cookie 2.5.0
Patched version tag: v2.5.0-patched
Repository URL: https://github.com/Gal-lankri/tough-cookie-security-fix.git
Tag URL: https://github.com/Gal-lankri/tough-cookie-security-fix/releases/tag/v2.5.0-patched

Node.js Compatibility
This patch has been tested and verified working on Node.js 20 LTS.

Unit Test Verification
The added unit test in test/security_fix_test.js verifies that:

Setting a cookie with __proto__ as domain fails to pollute the prototype
Normal cookie operations continue to work as expected
The prototype remains unpolluted after attempted exploitation

To run the test: 
```bash
node test/security_fix_test.js
```
