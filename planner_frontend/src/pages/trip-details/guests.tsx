import { CheckCircle2, CircleDashed, Mail, User, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participants {
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
}

export function Guests() {
    const { tripId } = useParams();
    const [participants, setParticipants] = useState<Participants[]>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants));
    }, [tripId]);

    const [isCreateGuestsModalOpen, setIsCreateGuestsModalOpen] = useState(false);

    function openCreateGuestsModal() {
        setIsCreateGuestsModalOpen(true);
    }

    function closeCreateGuestsModal() {
        setIsCreateGuestsModalOpen(false);
    }

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                {participants.map((participant, index) => {
                    return (
                        <div key={participant.id} className="flex items-center justify-between">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                                <span className="block text-sn text-zinc-400 truncate">
                                    {participant.email}
                                </span>
                            </div>
                            {participant.is_confirmed ? (
                                <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                            ) : (
                                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                            )}
                        </div>
                    );
                })}
            </div>
            <Button onClick={openCreateGuestsModal} variant="secondary" size="full">
                <UserCog className='size-5' />
                Cadastrar novo convidado
            </Button>

            {isCreateGuestsModalOpen && (
                <Modal
                    title="Cadastrar convidado"
                    subtitle="Todos convidados receberão emails para confirmar presença."
                    closeModalFunction={closeCreateGuestsModal}
                >
                    <form className="space-y-3">
                        <Input
                            icon={<User className="text-zinc-400 size-5" />}
                            type="text"
                            name="name"
                            placeholder="Nome do convidado"
                            variant="darker"
                        />

                        <div className="flex items-center gap-2">
                            <Input
                                icon={<Mail className="text-zinc-400 size-5" />}
                                type="email"
                                name="email"
                                placeholder="E-mail do convidado"
                                variant="darker"
                            />
                        </div>
                        <Button variant="primary" size="full">
                            Salvar convidado
                        </Button>
                    </form>
                </Modal>
            )}
        </div>
    );
}