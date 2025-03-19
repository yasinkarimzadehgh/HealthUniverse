"use client"

import { Link } from "react-router-dom"
import "../styles/Welcome.css"
import logo from "../assets/images/logo.png"

function Welcome() {

    return (
        <div className="welcome-container">
            {/* Animated Background Elements */}
            <div className="welcome-floating-orb welcome-orb-1"></div>
            <div className="welcome-floating-orb welcome-orb-2"></div>

            {/* Header Section */}
            <div className="welcome-header">
                <div className="welcome-header-logo-container">
                    <img src={logo || "/placeholder.svg"} alt="HealthUniverse Logo" className="welcome-header-logo-image" />
                </div>
                <h1 className="welcome-header-title">Welcome to HealthUniverse</h1>
                <p className="welcome-header-subtitle">
                    Your journey to a healthier lifestyle starts here. Discover a universe of wellness tools designed for your
                    success.
                </p>
                <div className="welcome-buttons">
                    <Link to="/register" className="welcome-button welcome-button-signup">
                        Get Started
                        <svg className="welcome-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                    <Link to="/login" className="welcome-button welcome-button-login">
                        Log In
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="welcome-features-section">
                <div className="welcome-feature-card">
                    <div className="welcome-feature-icon-container">
                        <svg className="welcome-feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22 12H18L15 21L9 3L6 12H2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="welcome-feature-title">Track Your Diet</h3>
                    <p className="welcome-feature-description">
                        Record and monitor your daily nutrition intake with our intelligent AI-powered tools and personalized
                        recommendations.
                    </p>
                </div>

                <div className="welcome-feature-card">
                    <div className="welcome-feature-icon-container">
                        <svg className="welcome-feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="welcome-feature-title">Universe Chat</h3>
                    <p className="welcome-feature-description">
                        Connect with certified health experts and like-minded individuals in our supportive community forums and
                        live chat.
                    </p>
                </div>

                <div className="welcome-feature-card">
                    <div className="welcome-feature-icon-container">
                        <svg className="welcome-feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 3V21H21M21 9L17 13L13 9L9 13L5 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="welcome-feature-title">Progress Insights</h3>
                    <p className="welcome-feature-description">
                        Visualize your health journey with detailed analytics, interactive charts, and personalized progress
                        reports.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Welcome

