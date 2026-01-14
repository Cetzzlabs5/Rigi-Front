import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/HomeView";

export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomeView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
