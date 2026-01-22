import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/HomeView";
import LoginView from "./views/auth/LoginView";
import AuthLayout from "./layouts/AuthLayout";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import AppLayout from "./layouts/AppLayout";

export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomeView />} />
                </Route>
                <Route path="auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginView />} />
                    <Route path="forgot-password" element={<ForgotPasswordView />} />
                    <Route path="new-password" element={<NewPasswordView />} />
                </Route>

                <Route path="dashboard" element={<AppLayout />}>
                    <Route index element={<HomeView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
