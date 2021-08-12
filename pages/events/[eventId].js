import { Fragment } from 'react';
import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';

function EventDetailPage(props) {
    // const router = useRouter();
    // const eventId = router.query.eventId;
    // const event = getEventById(eventId);

    if (!props.event) {
        return <p>No event find</p>
    }

    return <Fragment>
        <EventSummary title={props.event.title} />
        <EventLogistics date={props.event.date} address={props.event.location} image={props.event.image} imageAlt={props.event.title} />
        <EventContent>
            <p>{props.event.description}</p>
        </EventContent>
    </Fragment>

}


export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            event: event
        },
        revalidate: 1800
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { eventId: event.id } }));

    return {
        paths: paths,
        fallback: true
    };
}


export default EventDetailPage;