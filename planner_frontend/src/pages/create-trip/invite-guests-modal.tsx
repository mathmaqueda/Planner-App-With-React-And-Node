import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";

interface InviteGuestsModalProps {
    closeGuestsModal: () => void;
    emailsToInvite: string[];
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
    removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
    closeGuestsModal,
    emailsToInvite,
    addNewEmailToInvite,
    removeEmailFromInvites,
}: InviteGuestsModalProps) {
    return (
        <Modal
            title="Selecionar Convidados"
            subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem."
            closeModalFunction={closeGuestsModal}
        >
            <div className='flex flex-wrap gap-2'>
                {emailsToInvite.map(email => {
                    return (
                        <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                            <span className='text-zinc-300'>{email}</span>
                            <button type='button' onClick={() => removeEmailFromInvites(email)}>
                                <X className='size-4 text-zinc-400' />
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className='w-full h-px bg-zinc-800'></div>

            <form onSubmit={addNewEmailToInvite} className='flex items-center gap-2'>
                <Input
                    icon={<AtSign className='size-5 text-zinc-400' />}
                    type="email"
                    name='email'
                    placeholder="Digite o e-mail do convidado"
                />
                <Button type="submit" variant="primary">
                    Convidar
                    <Plus className='size-5' />
                </Button>
            </form>
        </Modal>
    );
}