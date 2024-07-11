import { X } from "lucide-react";

interface ModalProps {
    title: string;
    subtitle: React.ReactNode;
    closeModalFunction: () => void;
    children?: React.ReactNode;
    footer?: React.ReactNode;
}

export function Modal({
    title,
    subtitle,
    closeModalFunction,
    children
}: ModalProps) {
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>{title}</h2>
                        <button onClick={closeModalFunction}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>{subtitle}</p>
                </div>

                {children}
            </div>
        </div>
    );
}