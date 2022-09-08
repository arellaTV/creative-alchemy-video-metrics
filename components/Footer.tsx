import type { NextPage } from 'next';
import Link from 'next/link';
import styles from './Footer.module.css';
import CookieConsent from "react-cookie-consent";

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <a>
          Creative Alchemy Video Metrics
        </a>
      </Link>
      <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
      <Link href="/terms-of-service"><a>Terms of Service</a></Link>
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </footer>
  );
};

export default Footer;
