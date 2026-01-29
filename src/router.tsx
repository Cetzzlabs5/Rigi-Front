import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import { RequireIncompleteProfile } from "./components/auth/RequireIncompleteProfile";

// Auth
const LoginView = lazy(() => import("./views/auth/LoginView"));
const ForgotPasswordView = lazy(() => import("./views/auth/ForgotPasswordView"));
const NewPasswordView = lazy(() => import("./views/auth/NewPasswordView"));
const RegisterView = lazy(() => import("./views/provider/RegisterView"));

// App
const HomeView = lazy(() => import("./views/HomeView"));
const ProviderData = lazy(() => import("./views/provider/ProviderData"));
const ProviderDocumentsPanel = lazy(
  () => import("./views/provider/ProviderDocumentsPanel")
);

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<LoginView />} />
          </Route>

          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginView />} />
            <Route path="forgot-password" element={<ForgotPasswordView />} />
            <Route path="new-password" element={<NewPasswordView />} />
            <Route path="register" element={<RegisterView />} />
          </Route>

          <Route path="dashboard" element={<AppLayout />}>
            <Route index element={<HomeView />} />

            <Route path="provider">
              <Route
                path="complete-profile"
                element={
                  <RequireIncompleteProfile>
                    <ProviderData />
                  </RequireIncompleteProfile>
                }
              />
              <Route index element={<ProviderData />} />
              <Route
                path="documents"
                element={<ProviderDocumentsPanel />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
