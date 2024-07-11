import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useState } from "react";
import { Modal } from "../../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns';
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean;
    closeGuestsInput: () => void;
    openGuestsInput: () => void;
    setDestination: (destination: string) => void;
    eventStartAndEndDates: DateRange | undefined;
    setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    eventStartAndEndDates,
    setEventStartAndEndDates
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    function openDatePicker() {
        setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null;

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <Input
                onChange={event => setDestination(event.target.value)}
                icon={<MapPin className='size-5 text-zinc-400' />}
                type="text"
                placeholder="Para onde você vai?"
                disabled={isGuestsInputOpen}
            />

            <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]">
                <Calendar className='size-5 text-zinc-400' />
                <span className="text-lg text-zinc-400 w-40 flex-1">
                    {displayedDate ? displayedDate : 'Quando?'}
                </span>
            </button>

            <div className='w-px h-6 bg-zinc-800'></div>


            {isGuestsInputOpen ? (
                <Button onClick={closeGuestsInput} variant="secondary">
                    Alterar local/data
                    <Settings2 className='size-5' />
                </Button>
            ) : (
                <Button onClick={openGuestsInput} variant="primary">
                    Continuar
                    <ArrowRight className='size-5' />
                </Button>
            )}

            {isDatePickerOpen && (
                <Modal
                    title="Selecione a data"
                    subtitle=""
                    closeModalFunction={closeDatePicker}
                >
                    <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                </Modal>
            )}
        </div>
    );
}