import { MdEngineering, MdOutlineVerifiedUser } from "react-icons/md";
import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <section className="flex min-h-screen overflow-y-hidden">
            <div className="grow relative p-12 flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                    <div className="size-full min-h-screen bg-center bg-no-repeat bg-cover opacity-60 mix-blend-overlay bg-[url('/login-image.webp')]"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-primary-900/90 via-primary-900/50 to-primary-900/30"></div>
                </div>
                <div className="z-10 text-on-primary max-w-lg">
                    <MdEngineering className="size-12 mb-6" />
                    <h1 className="text-5xl font-bold mb-4 tracking-tight">Seguridad y Eficiencia Operativa</h1>
                    <p className="text-gray-200 leading-relaxed">Plataforma integral para la gestión de proveedores. Control de identidades y eficiencia operativa.</p>
                    <small className="text-caption flex gap-2 items-center text-gray-400 mt-12">
                        <MdOutlineVerifiedUser />
                        <span>Sistema protegido y encriptado</span>
                    </small>
                </div>
            </div>
            <div className="min-w-5/12 flex flex-col justify-center items-center px-6 lg:px-12 overflow-y-hidden">
                <div className="flex flex-col items-start gap-8 max-w-[440px] w-full">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
