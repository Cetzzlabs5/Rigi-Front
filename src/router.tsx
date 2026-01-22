import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/HomeView";
import ProviderData from "./views/auth/ProviderData";
import RegisterView from "./views/auth/RegisterView";

export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomeView />} />
                </Route>
                <Route path="/auth">
                    <Route path="register" element={<RegisterView />} />
                    {/* Aquí iría el login: <Route path="login" element={<LoginView />} /> */}
                </Route>
                <Route path="/provider-profile" element={<ProviderData />} />
            </Routes>
        </BrowserRouter>
    )
}
