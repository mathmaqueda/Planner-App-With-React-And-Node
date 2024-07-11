import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format, parseISO } from "date-fns";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";

interface Trip {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | undefined>();
    const [isUpdateDestinationAndDateFormOpen, setUpdateDestinationAndDateFormOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
    const [destination, setDestination] = useState('');

    function openUpdateDestinationAndDateForm() {
        setUpdateDestinationAndDateFormOpen(true);
    }

    function openDatePicker() {
        setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => {
            setTrip(response.data.trip)
            setDestination(response.data.trip.destination);
            setEventStartAndEndDates({
                from: response.data.trip.starts_at ? parseISO(response.data.trip.starts_at) : undefined,
                to: response.data.trip.ends_at ? parseISO(response.data.trip.ends_at) : undefined,
            });
        });
    }, [tripId]);

    const displayedDate = trip ? format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d' de 'LLL")) : null;

    const displayedEditedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null;

    function updateDestinationAndDate() {
        if (!destination) {
            return
        }
        if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            return
        }

        api.put(`trips/${tripId}`, {
            destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to
        })
    }

    return (
        <div className="px-4 h-16 rounded-lg bg-zinc-900 shadow-shape flex items-center justify-between">
            {isUpdateDestinationAndDateFormOpen ? (
                <form className="w-full flex" onSubmit={updateDestinationAndDate}>
                    <Input
                        onChange={event => setDestination(event.target.value)}
                        icon={<MapPin className='size-5 text-zinc-400' />}
                        type="text"
                        placeholder={trip?.destination || 'Para onde vai?'}
                    />

                    <button type="button" onClick={openDatePicker} className="flex items-center gap-2 text-left w-[240px]">
                        <Calendar className='size-5 text-zinc-400' />
                        <span className="text-lg text-zinc-400 w-40 flex-1">
                            {displayedEditedDate ? displayedEditedDate : displayedDate}
                        </span>
                    </button>
                    { isDatePickerOpen && (
                        <Modal
                            title="Selecione a data"
                            subtitle=""
                            closeModalFunction={closeDatePicker}
                        >
                            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                        </Modal>
                    )}
                    <Button type="submit" onClick={updateDestinationAndDate} variant="primary">
                        Salvar
                        <ArrowRight className='size-5' />
                    </Button>
                </form>
            ) : (
                <div className="w-full flex justify-between">
                    <div className="flex items-center gap-2">
                        <MapPin className="size-5 text-zinc-400" />
                        <span className="text-lg text-zinc-100">{trip?.destination}</span>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-5 text-zinc-400" />
                            <span className="text-lg text-zinc-100">{displayedDate}</span>
                        </div>
                        <div className='w-px h-6 bg-zinc-800'></div>
                        <Button onClick={openUpdateDestinationAndDateForm} variant="secondary">
                            Alterar local/data
                            <Settings2 className='size-5' />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}