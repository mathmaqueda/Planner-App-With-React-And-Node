import { Link2, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
    closeCreateLinkModal
}: CreateLinkModalProps) {
    const {tripId} = useParams();

    function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        const title = data.get('title')?.toString();
        const url = data.get('link')?.toString();

        api.post(`/trips/${tripId}/links`, {
            title,
            url
        })

        window.document.location.reload();
    }

    return (
        <Modal
            title="Cadastrar link"
            subtitle="Todos convidados podem visualizar os links importantes."
            closeModalFunction={closeCreateLinkModal}
        >
            <form onSubmit={createActivity} className="space-y-3">
                <Input
                    icon={<Tag className="text-zinc-400 size-5" />}
                    type="text"
                    name="title"
                    placeholder="Título do link"
                    variant="darker"
                />

                <div className="flex items-center gap-2">
                    <Input
                        icon={<Link2 className="text-zinc-400 size-5" />}
                        type="string"
                        name="link"
                        placeholder="URL"
                        variant="darker"
                    />
                </div>
                <Button variant="primary" size="full">
                    Salvar link
                </Button>
            </form>
        </Modal>
    );
}