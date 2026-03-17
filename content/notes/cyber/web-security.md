---
title: "Web Security"
order: 2
---

# Web Security

Common web application vulnerabilities and defenses.

## OWASP Top 10

The most critical web application security risks:

1. **Injection** — SQL, NoSQL, OS command injection
2. **Broken Authentication** — weak session management, credential stuffing
3. **XSS** — cross-site scripting via unsanitized user input
4. **IDOR** — insecure direct object references
5. **Security Misconfiguration** — default credentials, verbose errors

## Cross-Site Scripting (XSS)

### Types

- **Reflected** — malicious script in URL parameters, reflected back in response
- **Stored** — script persisted in database, served to all users
- **DOM-based** — client-side JavaScript manipulates DOM unsafely

### Prevention

```javascript
// Bad — direct HTML insertion
element.innerHTML = userInput;

// Good — use textContent for plain text
element.textContent = userInput;

// Good — sanitize if HTML is needed
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

## SQL Injection

### Example

```sql
-- Vulnerable query
SELECT * FROM users WHERE name = '' OR '1'='1' --'

-- Parameterized query (safe)
SELECT * FROM users WHERE name = ?
```

### Prevention

Always use parameterized queries or prepared statements. Never concatenate user input into SQL strings.

## CSRF

Cross-Site Request Forgery tricks authenticated users into making unintended requests.

**Defense:** Include a random CSRF token in forms and verify it server-side. Use `SameSite=Strict` on cookies.

## Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
