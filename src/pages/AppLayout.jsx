import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import '../styles/AppLayout.css'
import Footer from "../components/Footer";

function AppLayout() {
    return (
        <div className="app-layout">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />


        </div>
    );
}

export default AppLayout;