import { useState } from "react";
import Modal from "./UI/Modal";

export default function Demo() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <h1 className="text-h1">Texto con el encabezado Principal</h1>
            <h2 className="text-h2">Texto con el encabezado Secundario</h2>
            {isModalOpen && (
                <Modal title="Modal Title" onClose={() => setIsModalOpen(false)}>
                    <p>Modal Content</p>
                </Modal>
            )}
            <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        </div>
    )
}
