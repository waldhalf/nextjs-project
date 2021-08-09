import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventSummay from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
function EventDetailPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);
    if (!event) {
        return <p>No event find</p>
    }
    return <Fragment>
        <EventSummay title={event.title}></EventSummay>
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}>
            <p>{event.description}</p>
        </EventLogistics>
        <EventContent></EventContent>
    </Fragment>
}

export default EventDetailPage;