import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputBlockVariants = tv({
    base: 'flex items-center gap-2 flex-1',
    variants: {
        variant: {
            darker: 'h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg'
        }
    }
})


interface InputProps extends VariantProps<typeof inputBlockVariants>, ComponentProps<'input'> {
    icon: ReactNode;
    type: string;
    name?: string;
    placeholder: string;
    className?: string;
    disabled?: boolean;
}

export function Input({
    icon,
    type,
    name,
    placeholder,
    disabled,
    variant,
    ...props
}: InputProps) {
    return (
        <div className={inputBlockVariants({variant})}>
            {icon}
            <input
                {...props}
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
        </div>
    );
}