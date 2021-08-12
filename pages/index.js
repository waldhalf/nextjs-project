
import { getFeaturedEvents } from '../helpers/api-utils';
import EventList from '../components/events/EventList';

function HomePage(props) {

  return (
    <EventList items={props.events} />
  );
}

export default HomePage;

export async function getStaticProps() {

  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}