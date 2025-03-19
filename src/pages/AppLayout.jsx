import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

import "../styles/AppLayout.css";

function AppLayout() {
    return (
        <div className="app-layout">
            <Header />
            <ScrollToTop />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
