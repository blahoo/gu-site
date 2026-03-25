// =============================================================================
// DESIGN SYSTEM: Obsidian-Inspired Knowledge Graph / Minimal Dark
// ContactSection: Fixed right sidebar with inline SVG social icons and profile image
// Width: 320px, scrollable, positioned fixed on the right
// =============================================================================

import type { SVGProps } from "react";

interface ContactSectionProps {
  imageSrc: string;
}

// Inline SVG icon components using currentColor for CSS color control
function GmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512.004 512.004" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M506.394,92.79L363.119,228.172L506.394,419.19c3.477-6.955,5.611-14.656,5.611-22.955V115.745 C512.004,107.468,509.85,99.745,506.394,92.79z"/>
      <path d="M281.131,246.979L472.896,65.753c-4.075-1.045-8.256-1.749-12.651-1.749H51.755c-4.736,0-9.216,0.832-13.568,2.027 l192.939,181.184C245.163,260.014,266.795,260.014,281.131,246.979z"/>
      <path d="M310.118,278.273c-15.509,14.123-34.88,21.184-54.229,21.184c-19.221,0-38.421-6.976-53.717-20.907l-22.08-20.736 L40.849,446.785c3.52,0.768,7.147,1.216,10.901,1.216h408.491c4.523,0,8.853-0.768,13.035-1.877L331.921,257.665L310.118,278.273z"/>
      <path d="M5.184,93.575C1.963,100.317,0,107.783,0,115.741v280.512c0,9.088,2.56,17.536,6.699,24.96l142.08-192.789L5.184,93.575z"/>
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#li)">
        <path d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="li"><rect width="48" height="48" fill="currentColor"/></clipPath>
      </defs>
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M36.6526 3.8078H43.3995L28.6594 20.6548L46 43.5797H32.4225L21.7881 29.6759L9.61989 43.5797H2.86886L18.6349 25.56L2 3.8078H15.9222L25.5348 16.5165L36.6526 3.8078ZM34.2846 39.5414H38.0232L13.8908 7.63406H9.87892L34.2846 39.5414Z" fill="currentColor"/>
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#gh)">
        <path fillRule="evenodd" clipRule="evenodd" d="M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0583 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.9491 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="gh"><rect width="48" height="48" fill="currentColor"/></clipPath>
      </defs>
    </svg>
  );
}

function StatistaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.84598 4.74239e-07C0.735602 -5.20991e-05 0.626296 0.0216496 0.524311 0.063865C0.422325 0.10608 0.329659 0.167982 0.25161 0.246031C0.173561 0.32408 0.11166 0.416745 0.0694447 0.518731C0.0272292 0.620717 0.00552753 0.730023 0.00558011 0.8404V16.0569H0.12628C0.12628 16.0569 3.73768 15.9888 5.26908 15.183C6.58265 14.4106 7.71948 13.3711 8.60608 12.1317L9.50908 10.8571L9.79478 10.4509C9.82908 10.4109 9.97688 10.1938 10.0626 10.0681C10.1483 9.9424 10.5207 9.4175 10.8807 8.8917C12.2809 6.95738 14.0742 5.34093 16.143 4.1484C19.4801 2.4342 23.903 2.606 23.903 2.606H23.9711V0.891701C23.9781 0.777178 23.9617 0.662423 23.9227 0.554513C23.8837 0.446602 23.823 0.347826 23.7443 0.264274C23.6657 0.180723 23.5708 0.114169 23.4654 0.0687169C23.3601 0.0232648 23.2465 -0.000121443 23.1318 4.74239e-07H0.84598ZM23.9655 7.9487C23.8947 7.96713 23.822 7.97687 23.7489 7.9777C23.7489 7.9777 20.1435 8.0457 18.5949 8.8571C17.2809 9.62707 16.1435 10.6648 15.2567 11.9029L14.3717 13.183C14.2403 13.3659 14.1147 13.5482 14.0804 13.5882L13.8114 13.971L12.9944 15.1484C12.9944 15.1484 10.8168 18.2917 7.73108 19.8917C4.53108 21.5546 0.34288 21.4456 8.01064e-05 21.4342V23.1484C-0.00145716 23.2597 0.0191449 23.3702 0.0606889 23.4735C0.102233 23.5768 0.16389 23.6708 0.242077 23.75C0.320263 23.8292 0.41342 23.8921 0.516131 23.9351C0.618843 23.978 0.729062 24.0001 0.84038 24H23.1261C23.3488 23.9998 23.5623 23.9112 23.7197 23.7536C23.8771 23.596 23.9655 23.3823 23.9654 23.1596L23.9655 7.9487Z" fill="currentColor"/>
    </svg>
  );
}

const socialLinks = [
  {
    label: "Email",
    href: "mailto:gu.gregory.gg@gmail.com",
    Icon: GmailIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gregory-gu/",
    Icon: LinkedInIcon,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/1gugre",
    Icon: XIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/blahoo",
    Icon: GithubIcon,
  },
  {
    label: "Statista",
    href: "https://www.statista.com/statistics/1235595/rate-hearing-loss-by-severity-worldwide/",
    Icon: StatistaIcon,
  },
];

export default function ContactSection({ imageSrc }: ContactSectionProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.75rem 1.25rem",
        fontSize: "0.85rem",
      }}
    >
      {/* Social Icon Buttons — inline SVGs with currentColor */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            title={link.label}
            aria-label={link.label}
            className="social-icon-link"
          >
            <link.Icon width="100%" height="100%" />
          </a>
        ))}
      </div>

      {/* Profile Image — width matches the bar, height scales naturally */}
      <div
        style={{
          marginTop: "auto",
          marginLeft: "-1.25rem",
          marginRight: "-1.25rem",
          marginBottom: "-1.75rem",
          overflow: "hidden",
        }}
      >
        <img
          src={imageSrc}
          alt="Portrait"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
