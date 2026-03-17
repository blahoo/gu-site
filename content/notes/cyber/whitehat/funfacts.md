---
title: "Cool Facts"
order: 0
---

# Network Security

Fundamentals of securing network communications and infrastructure.

## TLS/SSL

Transport Layer Security provides encrypted communication between clients and servers. The handshake establishes a shared secret using asymmetric cryptography, then switches to symmetric encryption for data transfer.

### Key Exchange

- **RSA** — server's public key encrypts the pre-master secret
- **ECDHE** — Elliptic Curve Diffie-Hellman for forward secrecy
- **X25519** — modern, fast curve used in TLS 1.3

## Firewalls

### Types

| Type | Layer | Description |
|------|-------|-------------|
| Packet filter | L3/L4 | Inspects IP headers, ports |
| Stateful | L3/L4 | Tracks connection state |
| Application | L7 | Deep packet inspection |
| WAF | L7 | Web-specific attack prevention |

### iptables Basics

```bash
# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Drop everything else
iptables -A INPUT -j DROP
```

## DNS Security

**DNSSEC** — cryptographically signs DNS records to prevent spoofing. Uses a chain of trust from root servers down to authoritative nameservers.

**DNS over HTTPS (DoH)** — encrypts DNS queries inside HTTPS, preventing ISP snooping and manipulation.
