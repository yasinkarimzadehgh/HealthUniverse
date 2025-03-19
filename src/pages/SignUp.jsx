import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiShield, FiAward, FiUsers, FiHeart } from "react-icons/fi";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/images/logo.png";
import "../styles/SignUp.css";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: "",
    });
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Check password strength if password field
        if (name === "password") {
            checkPasswordStrength(value);
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const checkPasswordStrength = (password) => {
        let score = 0;
        let label = "";

        if (password.length > 0) {
            // Length check
            if (password.length >= 8) score += 1;
            if (password.length >= 12) score += 1;

            // Character variety checks
            if (/[A-Z]/.test(password)) score += 1;
            if (/[a-z]/.test(password)) score += 1;
            if (/[0-9]/.test(password)) score += 1;
            if (/[^A-Za-z0-9]/.test(password)) score += 1;

            // Set label based on score
            if (score <= 2) label = "Weak";
            else if (score <= 4) label = "Fair";
            else if (score <= 5) label = "Good";
            else label = "Strong";
        }

        setPasswordStrength({ score, label });
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "You must agree to the terms and conditions";
        }

        return newErrors;
    };

    const handleNextStep = () => {
        const validationErrors = validateStep1();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateStep2();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            const requestData = {
                fullName: formData.fullName,
                emailAddress: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            };

            // Make the API call to the register endpoint using the correct base URL
            const response = await axios.post('http://85.208.253.76:7001/api/app/register', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('API Response:', response.data); // Log the response for debugging

            // Check if the response includes a token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            } else {
                navigate('/login');
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                // Handle specific backend errors
                const errorMessage = error.response.data.message || 'Registration failed. Please try again.';
                if (errorMessage.toLowerCase().includes('email')) {
                    setErrors({ ...errors, email: 'This email is already registered.' });
                } else {
                    setErrors({ ...errors, api: errorMessage });
                }
            } else if (error.request) {
                // Handle network errors (e.g., CORS or server down)
                setErrors({ ...errors, api: 'Cannot connect to the server. Please check your network or server status.' });
            } else {
                // Handle other errors
                setErrors({ ...errors, api: 'An unexpected error occurred. Please try again.' });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const getStrengthColor = () => {
        switch (passwordStrength.label) {
            case "Weak":
                return "var(--signup--strength-weak)";
            case "Fair":
                return "var(--signup--strength-fair)";
            case "Good":
                return "var(--signup--strength-good)";
            case "Strong":
                return "var(--signup--strength-strong)";
            default:
                return "#e0e0e0";
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-logo">
                    <img src={logo || "/placeholder.svg"} alt="HealthUniverse Logo" className="signup-logo-image" />
                </div>

                <div className="signup-header">
                    <h1>Create Account</h1>
                    <p>Join HealthUniverse and start your wellness journey</p>
                </div>

                <div className="signup-progress">
                    <div className="signup-progress-step">
                        <div className={`signup-progress-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
                        <span className="signup-progress-label">Account</span>
                    </div>
                    <div className="signup-progress-line"></div>
                    <div className="signup-progress-step">
                        <div className={`signup-progress-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
                        <span className="signup-progress-label">Security</span>
                    </div>
                </div>

                {step === 1 ? (
                    <form className="signup-form" onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                        <div className="signup-form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="signup-input-wrapper">
                                <FiUser className="signup-input-icon" />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={errors.fullName ? "signup-error" : ""}
                                    placeholder="Enter your full name"
                                    aria-describedby={errors.fullName ? "fullname-error" : undefined}
                                />
                            </div>
                            {errors.fullName && <span id="fullname-error" className="signup-error-message">{errors.fullName}</span>}
                        </div>

                        <div className="signup-form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="signup-input-wrapper">
                                <FiMail className="signup-input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? "signup-error" : ""}
                                    placeholder="Enter your email"
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                            </div>
                            {errors.email && <span id="email-error" className="signup-error-message">{errors.email}</span>}
                        </div>

                        <button type="submit" className="signup-button">
                            Continue
                        </button>

                        <div className="signup-benefits">
                            <h3 className="signup-benefits-title">Why join HealthUniverse?</h3>
                            <div className="signup-benefit">
                                <div className="signup-benefit-icon">
                                    <FiHeart />
                                </div>
                                <div className="signup-benefit-content">
                                    <h4 className="signup-benefit-title">Personalized Health Plans</h4>
                                    <p className="signup-benefit-text">Get customized nutrition and fitness plans tailored to your goals</p>
                                </div>
                            </div>
                            <div className="signup-benefit">
                                <div className="signup-benefit-icon">
                                    <FiUsers />
                                </div>
                                <div className="signup-benefit-content">
                                    <h4 className="signup-benefit-title">Community Support</h4>
                                    <p className="signup-benefit-text">Connect with like-minded individuals on their health journey</p>
                                </div>
                            </div>
                            <div className="signup-benefit">
                                <div className="signup-benefit-icon">
                                    <FiAward />
                                </div>
                                <div className="signup-benefit-content">
                                    <h4 className="signup-benefit-title">Expert Guidance</h4>
                                    <p className="signup-benefit-text">Access to certified health professionals and nutritionists</p>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-form-group">
                            <label htmlFor="password">Password</label>
                            <div className="signup-input-wrapper">
                                <FiLock className="signup-input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? "signup-error" : ""}
                                    placeholder="Create a password"
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                />
                                <button
                                    type="button"
                                    className="signup-toggle-password"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password ? (
                                <span id="password-error" className="signup-error-message">{errors.password}</span>
                            ) : (
                                formData.password && (
                                    <div className="signup-password-strength">
                                        <div className="signup-strength-bar">
                                            <div
                                                className="signup-strength-progress"
                                                style={{
                                                    width: `${(passwordStrength.score / 6) * 100}%`,
                                                    backgroundColor: getStrengthColor(),
                                                }}
                                            ></div>
                                        </div>
                                        <span className="signup-strength-text" style={{ color: getStrengthColor() }}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                )
                            )}
                            {formData.password && !errors.password && (
                                <div className="signup-password-tips">
                                    <p className="signup-password-tip">
                                        <span className={`signup-password-check ${formData.password.length >= 8 ? 'valid' : ''}`}>
                                            {formData.password.length >= 8 ? <FiCheck /> : '•'}
                                        </span>
                                        At least 8 characters
                                    </p>
                                    <p className="signup-password-tip">
                                        <span className={`signup-password-check ${/[A-Z]/.test(formData.password) ? 'valid' : ''}`}>
                                            {/[A-Z]/.test(formData.password) ? <FiCheck /> : '•'}
                                        </span>
                                        At least one uppercase letter
                                    </p>
                                    <p className="signup-password-tip">
                                        <span className={`signup-password-check ${/[0-9]/.test(formData.password) ? 'valid' : ''}`}>
                                            {/[0-9]/.test(formData.password) ? <FiCheck /> : '•'}
                                        </span>
                                        At least one number
                                    </p>
                                    <p className="signup-password-tip">
                                        <span className={`signup-password-check ${/[^A-Za-z0-9]/.test(formData.password) ? 'valid' : ''}`}>
                                            {/[^A-Za-z0-9]/.test(formData.password) ? <FiCheck /> : '•'}
                                        </span>
                                        At least one special character
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="signup-form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="signup-input-wrapper">
                                <FiLock className="signup-input-icon" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={errors.confirmPassword ? "signup-error" : ""}
                                    placeholder="Confirm your password"
                                    aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                                />
                                <button
                                    type="button"
                                    className="signup-toggle-password"
                                    onClick={toggleConfirmPasswordVisibility}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span id="confirm-password-error" className="signup-error-message">{errors.confirmPassword}</span>}
                        </div>

                        <div className="signup-terms-group">
                            <div className="signup-agreeTerms">
                                <input
                                    type="checkbox"
                                    id="agreeTerms"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                />
                                <label htmlFor="agreeTerms" className="signup-agreeTerms-label">
                                    <span className="signup-agreeTerms-checkbox">
                                        {formData.agreeTerms && <FiCheck className="signup-agreeTerms-checkbox-icon" />}
                                    </span>
                                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                                </label>
                            </div>
                            {errors.agreeTerms && <span className="signup-error-message signup-terms-error">{errors.agreeTerms}</span>}
                        </div>

                        {/* Display API errors */}
                        {errors.api && <span className="signup-error-message">{errors.api}</span>}

                        <div className="signup-buttons">
                            <button type="button" className="signup-back-button" onClick={() => setStep(1)}>
                                Back
                            </button>
                            <button type="submit" className="signup-button" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="signup-spinner"></span>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>
                )}

                <div className="signup-divider">
                    <span>Or sign up with</span>
                </div>

                <div className="social-signup">
                    <button type="button" className="social-signup-button google" disabled>
                        <FaGoogle className="signup-social-icon" />
                        <span>Google</span>
                    </button>
                    <button type="button" className="social-signup-button facebook" disabled>
                        <FaFacebookF className="signup-social-icon" />
                        <span>Facebook</span>
                    </button>
                    <button type="button" className="social-signup-button apple" disabled>
                        <FaApple className="signup-social-icon" />
                        <span>Apple</span>
                    </button>
                </div>

                <div className="signup-footer">
                    <p>
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;