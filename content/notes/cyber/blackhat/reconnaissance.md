---
title: "Reconnaissance"
order: 0
---

# Reconnaissance

Information gathering is the first phase of any penetration test. The goal is to map the attack surface before attempting exploitation.

## Passive Recon

Gathering information without directly interacting with the target.

### OSINT Tools

| Tool | Purpose |
|------|---------|
| Shodan | Search for internet-connected devices |
| theHarvester | Email, subdomain, and name enumeration |
| Maltego | Visual link analysis and data mining |
| Recon-ng | Modular web reconnaissance framework |

### DNS Enumeration

```bash
# Subdomain discovery
dig axfr @ns1.target.com target.com

# Reverse DNS lookup
dig -x 192.168.1.1

# Find mail servers
dig MX target.com
```

### Google Dorking

```
site:target.com filetype:pdf
inurl:admin site:target.com
intitle:"index of" site:target.com
```

## Active Recon

Directly probing the target — more intrusive, higher risk of detection.

### Port Scanning

```bash
# TCP SYN scan (stealth)
nmap -sS -T4 target.com

# Service version detection
nmap -sV -sC target.com

# Full port scan with OS detection
nmap -p- -A target.com
```

### Web Application Fingerprinting

```bash
# Identify web technologies
whatweb target.com

# Directory brute-forcing
gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt
```
