import { User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import loading from '../../assets/loading.gif';
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
    setOwnerName: (name: string) => void;
    setOwnerEmail: (email: string) => void;
    destination: string;
    eventStartAndEndDates: DateRange | undefined;
    isLoading: boolean;
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail,
    destination,
    eventStartAndEndDates,
    isLoading
}: ConfirmTripModalProps) {
    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null;
    return (
        <Modal
            title="Confirmar criação de viagem"
            subtitle={
                <>
                    Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'>{destination}</span> nas datas de <span className="font-semibold text-zinc-100">{displayedDate}</span> preencha seus dados abaixo:
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
                    {isLoading ? (
                        <img className="h-10 w-10" src={loading} alt="loading..." />  
                    ) : (
                        <span>Confirmar criação da viagem</span>
                    )}
                </Button>
            </form>
        </Modal>
    )
}