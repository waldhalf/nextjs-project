
import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/EventList';
function HomePage() {

  const featuredEvents = getFeaturedEvents();
  return (
    <EventList items={featuredEvents} />
  );
}

export default HomePage;