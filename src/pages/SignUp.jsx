import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi"
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa"
import logo from "../assets/images/logo.png"
import "../styles/SignUp.css"

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: "",
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })

        // Check password strength if password field
        if (name === "password") {
            checkPasswordStrength(value)
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            })
        }
    }

    const checkPasswordStrength = (password) => {
        let score = 0
        let label = ""

        if (password.length > 0) {
            // Length check
            if (password.length >= 8) score += 1
            if (password.length >= 12) score += 1

            // Character variety checks
            if (/[A-Z]/.test(password)) score += 1
            if (/[a-z]/.test(password)) score += 1
            if (/[0-9]/.test(password)) score += 1
            if (/[^A-Za-z0-9]/.test(password)) score += 1

            // Set label based on score
            if (score <= 2) label = "Weak"
            else if (score <= 4) label = "Fair"
            else if (score <= 5) label = "Good"
            else label = "Strong"
        }

        setPasswordStrength({ score, label })
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "You must agree to the terms and conditions"
        }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Redirect to home page after successful signup
            navigate("/home")
        }, 1500)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const getStrengthColor = () => {
        switch (passwordStrength.label) {
            case "Weak":
                return "#e74c3c"
            case "Fair":
                return "#f39c12"
            case "Good":
                return "#3498db"
            case "Strong":
                return "#2ecc71"
            default:
                return "#e0e0e0"
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-logo">
                    <img src={logo} alt="HealthUniverse Logo" className="signup-logo-image" />
                </div>

                <div className="signup-header">
                    <h1>Create Account</h1>
                    <p>Join HealthUniverse and start your wellness journey</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
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
                            />
                        </div>
                        {errors.fullName && <span className="signup-error-message">{errors.fullName}</span>}
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
                            />
                        </div>
                        {errors.email && <span className="signup-error-message">{errors.email}</span>}
                    </div>

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
                            <span className="signup-error-message">{errors.password}</span>
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
                    </div>

                    <div className="signup-form-group">
                        <label htmlFor="signup-confirmPassword">Confirm Password</label>
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
                        {errors.confirmPassword && <span className="signup-error-message">{errors.confirmPassword}</span>}
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
                                <span className="signup-agreeTerms-checkbox">{formData.agreeTerms && <FiCheck className="signup-agreeTerms-checkbox-icon" />}</span>I
                                agree to the&nbsp;
                                <a href="#">Terms of Service</a>&nbsp;and&nbsp;
                                <a href="#">Privacy Policy</a>
                            </label>
                        </div>
                        {errors.agreeTerms && <span className="signup-error-message signup-terms-error">{errors.agreeTerms}</span>}
                    </div>

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
                </form>

                <div className="signup-divider">
                    <span>Or sign up with</span>
                </div>

                <div className="social-signup">
                    <button type="button" className="social-signup-button google">
                        <FaGoogle className="signup-social-icon" />
                        <span>Google</span>
                    </button>
                    <button type="button" className="social-signup-button facebook">
                        <FaFacebookF className="signup-social-icon" />
                        <span>Facebook</span>
                    </button>
                    <button type="button" className="social-signup-button apple">
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
    )
}

export default SignUp
