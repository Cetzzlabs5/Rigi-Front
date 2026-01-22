import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/HomeView";
import ProviderData from "./views/auth/ProviderData";

export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomeView />} />
                </Route>
                <Route path="/provider-data" element={<ProviderData />} />
            </Routes>
        </BrowserRouter>
    )
}
