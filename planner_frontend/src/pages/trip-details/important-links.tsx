import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { useState } from "react";

export function ImportantLinks() {
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true);
    }

    function closeCreateLinkModal() {
        setIsCreateLinkModalOpen(false);
    }

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                            https://www.airbnb.com.br/rooms/10470001120492304920492304923049204920
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                            https://www.airbnb.com.br/rooms/10470001120492304920492304923049204920
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
            </div>

            <Button onClick={openCreateLinkModal} variant="secondary" size="full">
                <Plus className='size-5' />
                Cadastrar novo link
            </Button>

            {isCreateLinkModalOpen && (
                <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
            )}
        </div>
    );
}