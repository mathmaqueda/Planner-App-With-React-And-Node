import { Calendar, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { FormEvent } from "react";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
    closeCreateActivityModal
}: CreateActivityModalProps) {
    const { tripId } = useParams();

    function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const title = data.get('title')?.toString();
        const occurs_at = data.get('occurs_at')?.toString();

        api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at
        })

        window.document.location.reload();
    }

    return (
        <Modal
            title="Cadastrar atividade"
            subtitle="Todos convidados podem visualizar as atividades"
            closeModalFunction={closeCreateActivityModal}
        >
            <form onSubmit={createActivity} className="space-y-3">
                <Input
                    icon={<Tag className="text-zinc-400 size-5" />}
                    type="text"
                    name="title"
                    placeholder="Qual a atividade?"
                    variant="darker"
                />

                <div className="flex items-center gap-2">
                    <Input
                        icon={<Calendar className="text-zinc-400 size-5" />}
                        type="datetime-local"
                        name="occurs_at"
                        placeholder="Data e horário da atividade"
                        variant="darker"
                    />
                </div>
                <Button variant="primary" size="full">
                    Salvar atividade
                </Button>
            </form>
        </Modal>
    );
}