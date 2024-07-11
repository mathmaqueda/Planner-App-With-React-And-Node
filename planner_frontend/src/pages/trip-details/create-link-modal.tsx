import { Link2, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
    closeCreateLinkModal
}: CreateLinkModalProps) {
    return (
        <Modal
            title="Cadastrar link"
            subtitle="Todos convidados podem visualizar os links importantes."
            closeModalFunction={closeCreateLinkModal}
        >
            <form className="space-y-3">
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