import { Fragment } from 'react';
import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventsSearch";
import { useRouter } from 'next/router';

function AllEventsPage(props) {
    const router = useRouter()
    const { allEvents } = props;
    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }
    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={allEvents} />
        </Fragment>)
}

export async function getStaticProps() {
    const allEvents = await getAllEvents();
    return {
        props: {
            allEvents: allEvents
        },
        revalidate: 1800
    };
}

export default AllEventsPage;