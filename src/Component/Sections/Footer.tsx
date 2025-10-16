"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaCrown,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGem,
} from "react-icons/fa";
import { FaInstagram, FaTiktok, FaTwitter, FaPinterest } from "react-icons/fa6";
import styles from './Footer.module.scss';

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`${styles.footerWrapper} ${isVisible ? styles.visible : ""}`}
      aria-labelledby="footer-heading"
    >
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Contact Info */}
          <section className={styles.contactSection} aria-label="Contact Information">
            <h3 id="footer-heading" className={styles.footerTitle}>
              <FaCrown className={styles.footerCrown} aria-hidden="true" /> connect with Bre
            </h3>
            <address className={styles.contactInfo}>

              <p className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.footerCrown} aria-hidden="true" />
                <span>2233 E 38th st, Indianapolis, IN 46218

                </span>
              </p>
              <p className={styles.contactItem}>
                <FaPhone className={styles.footerCrown} aria-hidden="true" />
                <a href="tel:+13178286763" aria-label="Call us at (888) 555-BILLIONAIREBRE">
                  (888) 555-BILLIONAIREBRE
                </a>
              </p>
              <p className={styles.contactItem}>
                <FaEnvelope className={styles.footerCrown} aria-hidden="true" />
                <a
                  href="mailto:Bre.harrington@icloud.com"
                  aria-label="Email Bre.harrington@icloud.com"
                >
                  Bre.harrington@icloud.com
                </a>
              </p>
            </address>
          </section>

          {/* Links */}
          <nav className={styles.linksSection} aria-label="Quick Navigation Links">
            <h3 className={styles.footerTitle}>Exclusive Access</h3>
            <ul className={styles.quickLinks}>
              <li>
                <a href="#services">Premium Services</a>
              </li>
              <li>
                <a href="#stylists">Meet Our Stylists</a>
              </li>
              <li>
                <a href="#vip">VIP Experiences</a>
              </li>
              <li>
                <a href="#testimonials">Client Stories</a>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <section
            className={styles.newsletterSection}
            aria-label="Join the Billionaire Bre Circle Newsletter"
          >
            <h3 className={styles.footerTitle}>Join the Billionare Bre Circle</h3>
            <p className={styles.newsletterDesc}>
              Get VIP updates, exclusive offers, and early access to celebrity
              events. Privacy guaranteed.
            </p>
            <form className={styles.newsletterForm} aria-label="Newsletter Subscription Form">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email for exclusive access"
                className={styles.newsletterInput}
                aria-required="true"
              />
              <button type="submit" className={styles.newsletterBtn}>
                <FaGem aria-hidden="true" /> Subscribe
              </button>
            </form>
          </section>

          {/* Social */}
          <section className={styles.socialSection} aria-label="Follow us on Social Media">
            <h3 className={styles.footerTitle}>Follow the Glam</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Visit our Instagram"
              >
                <FaInstagram className={styles.footerCrown} />
              </a>
              <a
                href="https://www.tiktok.com/@billionaire.bre888?_t=ZS-90cmoA5fJIR&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Visit our TikTok"
              >
                <FaTiktok className={styles.footerCrown} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Visit our Twitter"
              >
                <FaTwitter className={styles.footerCrown} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Visit our Pinterest"
              >
                <FaPinterest className={styles.footerCrown} />
              </a>
            </div>
          </section>
        </div>

        {/* Divider */}
        <div className={styles.footerDivider} aria-hidden="true">
          <FaCrown className={styles.footerCrown} />
        </div>

        {/* Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2025 Billionaire Bree | Where Celebrities Crown Their Style
          </p>
          <p className={styles.tagline}>
            Exclusivity Redefined | Discreet. Luxurious. Unparalleled.
          </p>
        </div>
      </div>
    </footer>
  );
}
