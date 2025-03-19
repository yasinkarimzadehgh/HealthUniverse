import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiArrowRight, FiShield, FiClock, FiSmartphone, FiGlobe } from "react-icons/fi"
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa"
import logo from "../assets/images/logo.png"
import "../styles/Login.css"

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
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
            // Redirect to home page after successful login
            navigate("/home")
        }, 1500)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Logo and Header */}
                <div className="login-logo">
                    <img src={logo || "/placeholder.svg"} alt="HealthUniverse Logo" className="login-logo-image" />
                </div>

                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue your wellness journey</p>
                </div>

                {/* Login form */}
                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Email Address */}
                    <div className="login-form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="login-input-wrapper">
                            <FiMail className="login-input-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "login-error" : ""}
                                placeholder="Enter your email"
                                aria-describedby={errors.email ? "email-error" : undefined}
                            />
                        </div>
                        {errors.email && <span id="email-error" className="login-error-message">{errors.email}</span>}
                    </div>
                    {/* Password */}
                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <div className="login-input-wrapper">
                            <FiLock className="login-input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? "login-error" : ""}
                                placeholder="Enter your password"
                                aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            <button
                                type="button"
                                className="login-toggle-password"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {errors.password && <span id="password-error" className="login-error-message">{errors.password}</span>}
                    </div>

                    <div className="login-options">
                        <div className="login-remember-me">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <label htmlFor="rememberMe" className="login-remember-label">
                                <span className="login-remember-checkbox">{formData.rememberMe && <FiCheck className="login-remember-checkbox-icon" />}</span>
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" className="login-forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="login-spinner"></span>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <FiArrowRight className="login-button-icon" />
                            </>
                        )}
                    </button>
                </form>

                <div className="login-divider">
                    <span>Or continue with</span>
                </div>

                <div className="social-login">
                    <button type="button" className="social-login-button google">
                        <FaGoogle className="login-social-icon" />
                        <span>Google</span>
                    </button>
                    <button type="button" className="social-login-button facebook">
                        <FaFacebookF className="login-social-icon" />
                        <span>Facebook</span>
                    </button>
                    <button type="button" className="social-login-button apple">
                        <FaApple className="login-social-icon" />
                        <span>Apple</span>
                    </button>
                </div>


                <div className="login-footer">
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login