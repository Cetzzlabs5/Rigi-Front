import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import { getHealthCheck } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function HomeView() {

    const [openModal, setOpenModal] = useState(false)
    const { data, isLoading } = useQuery({
        queryKey: ['health'],
        queryFn: getHealthCheck
    })

    if (isLoading) return <div>Loading...</div>

    if (data) return (
        <>
            <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
            {openModal && (
                <Modal title="Health Check" onClose={() => { setOpenModal(false) }}>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </Modal>
            )}
        </>
    )
}
