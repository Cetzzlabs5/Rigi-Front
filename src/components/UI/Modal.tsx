type ModalProps = {
    onClose: () => void
    children: React.ReactNode
    title: string
}

export default function Modal({ onClose, children, title }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
            <div className="bg-surface p-6 rounded-lg shadow-lg min-w-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-h2">{title}</h2>
                    <button onClick={onClose}>X</button>
                </div>

                {children}
            </div>
        </div>
    )
}
