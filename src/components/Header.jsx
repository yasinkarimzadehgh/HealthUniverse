"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Sun, Moon } from "lucide-react"
import { toggleTheme } from "../redux/Theme/themeActions"
import logo from "../assets/images/logo.png"
import "../styles/Header.css"

function Header() {
    const dispatch = useDispatch()
    const { darkMode } = useSelector((state) => state.theme)

    // Handle theme toggle
    const handleThemeToggle = () => {
        dispatch(toggleTheme())

        // Also update localStorage for consistency with sign-up page
        localStorage.setItem("theme", darkMode ? "light" : "dark")
    }

    // Apply dark mode class to body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [darkMode])

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="header-logo-link">
                    <img src={logo || "/placeholder.svg"} alt="HealthUniverse Logo" className="header-logo" />
                    <span className="header-title">HealthUniverse</span>
                </Link>

                <div className="header-actions">
                    <button
                        className="header-theme-toggle-button"
                        onClick={handleThemeToggle}
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header

