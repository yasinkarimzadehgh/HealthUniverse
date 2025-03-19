import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import logo from '../assets/images/logo.png';
import '../styles/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo-link">
                            <img src={logo || "/placeholder.svg"} alt="HealthUniverse Logo" className="footer-logo" />
                            <span className="footer-title">HealthUniverse</span>
                        </Link>
                        <p className="footer-tagline">
                            Your complete health and wellness platform
                        </p>
                        <div className="footer-social">
                            <a href="#" aria-label="Instagram" className="footer-social-link">
                                <Instagram size={18} />
                            </a>
                            <a href="#" aria-label="Twitter" className="footer-social-link">
                                <Twitter size={18} />
                            </a>
                            <a href="#" aria-label="Facebook" className="footer-social-link">
                                <Facebook size={18} />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="footer-social-link">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-container">
                        <div className="footer-links-column">
                            <h3 className="footer-links-title">Company</h3>
                            <ul className="footer-links-list">
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/press">Press</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h3 className="footer-links-title">Services</h3>
                            <ul className="footer-links-list">
                                <li><Link to="/health-tracking">Health Tracking</Link></li>
                                <li><Link to="/nutrition">Nutrition Plans</Link></li>
                                <li><Link to="/fitness">Fitness Programs</Link></li>
                                <li><Link to="/mental-health">Mental Wellness</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h3 className="footer-links-title">Support</h3>
                            <ul className="footer-links-list">
                                <li><Link to="/help">Help Center</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/faq">FAQs</Link></li>
                                <li><Link to="/community">Community</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h3 className="footer-links-title">Legal</h3>
                            <ul className="footer-links-list">
                                <li><Link to="/terms">Terms of Service</Link></li>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                                <li><Link to="/cookies">Cookie Policy</Link></li>
                                <li><Link to="/compliance">Compliance</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h3 className="footer-newsletter-title">Stay Updated</h3>
                    <p className="footer-newsletter-text">
                        Subscribe to our newsletter for the latest health tips and updates.
                    </p>
                    <div className="footer-newsletter-form">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="footer-newsletter-input"
                            aria-label="Email for newsletter"
                        />
                        <button className="footer-newsletter-button">
                            <Mail size={18} />
                            <span>Subscribe</span>
                        </button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>© {currentYear} HealthUniverse. All rights reserved.</p>
                    </div>
                    <div className="footer-made-with">
                        <p>Made with <Heart size={14} className="footer-heart-icon" /> for a healthier world</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
