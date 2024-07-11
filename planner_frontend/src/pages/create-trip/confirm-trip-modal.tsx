import { User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
    setOwnerName: (name: string) => void;
    setOwnerEmail: (email: string) => void;
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail
}: ConfirmTripModalProps) {
    return (
        <Modal
            title="Confirmar criação de viagem"
            subtitle={
                <>
                    Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'>Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
                </>
            }
            closeModalFunction={closeConfirmTripModal}
        >
            <form onSubmit={createTrip} className="space-y-3">
                <Input
                    onChange={event => setOwnerName(event.target.value)}
                    icon={<User className="text-zinc-400 size-5" />}
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    variant="darker"
                />

                <Input
                    onChange={event => setOwnerEmail(event.target.value)}
                    icon={<User className="text-zinc-400 size-5" />}
                    type="email"
                    name="email"
                    placeholder="Seu e-mail pessoal"
                    variant="darker"
                />

                <Button type="submit" variant="primary" size="full">
                    Confirmar criação da viagem
                </Button>
            </form>
        </Modal>
    )
}