import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import { Fragment, useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import useSWR from 'swr';


function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filterData = router.query.slug;

    const { data, error } = useSWR('https://nextjs-blog-3f1a6-default-rtdb.europe-west1.firebasedatabase.app/events.json');

    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }
            setLoadedEvents(events);
        }
    }, [data]);

    if (!loadedEvents) {
        return <p className="center">Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;


    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2031 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error) {
        return <Fragment>
            <ErrorAlert>
                <p>Invalid Filter</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Go back home</Button>
            </div>
        </Fragment>
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert>
                <p>No Events found</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Go back home</Button>
            </div>
        </Fragment>
    }

    const date = new Date(numYear, numMonth - 1);

    return <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </Fragment>
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filteredData = params.slug;
//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth


//     if (isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2031 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12) {
//         return {
//             props: {
//                 hasError: true
//             }
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error'
//             // }

//         }
//     }
//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });
//     return {
//         props: {
//             filteredEvents: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     };
// }

export default FilteredEventsPage;