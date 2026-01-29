export default function Loader() {
    return (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-body font-semibold text-primary-900 animate-pulse">
                        Cargando
                    </p>

                    <div className="flex gap-1.5">
                        <span
                            className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                            style={{ animationDelay: '0ms' }}
                        ></span>
                        <span
                            className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                            style={{ animationDelay: '150ms' }}
                        ></span>
                        <span
                            className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                            style={{ animationDelay: '300ms' }}
                        ></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
