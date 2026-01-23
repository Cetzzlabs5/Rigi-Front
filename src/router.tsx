import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/HomeView";
import ProviderData from "./views/provider/ProviderData";
import { ProviderDocumentsPanel } from "./views/provider/ProviderDocumentsPanel";

export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomeView />} />
                    <Route path="provider-documents" element={<ProviderDocumentsPanel />} />
                    <Route path="provider-profile" element={<ProviderData />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
