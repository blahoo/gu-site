---
title: "Cryptography"
order: 1
---

# Cryptography

Core cryptographic primitives and their applications.

## Symmetric Encryption

Same key for encryption and decryption. Fast, used for bulk data.

- **AES-256-GCM** — standard for authenticated encryption
- **ChaCha20-Poly1305** — alternative, performs well without hardware AES support

## Asymmetric Encryption

Public/private key pairs. Slower, used for key exchange and signatures.

- **RSA** — based on integer factorization, key sizes 2048–4096 bits
- **ECDSA** — elliptic curve variant, smaller keys for equivalent security
- **Ed25519** — modern signing algorithm, fast and constant-time

## Hashing

One-way functions that produce fixed-size output from arbitrary input.

| Algorithm | Output | Use Case |
|-----------|--------|----------|
| SHA-256 | 256 bits | General purpose, certificates |
| SHA-3 | Variable | Next-gen standard |
| BLAKE3 | 256 bits | High performance |
| bcrypt | 184 bits | Password hashing |
| Argon2 | Variable | Password hashing (modern) |

### Password Hashing

Never store passwords in plaintext. Use a slow, salted hash:

```python
import bcrypt

# Hash a password
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))

# Verify
bcrypt.checkpw(password.encode(), hashed)
```

## Key Derivation

**HKDF** — derives multiple keys from a single secret. Used in TLS 1.3.

**PBKDF2** — derives keys from passwords with salt and iterations.
