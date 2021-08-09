import Link from 'next/link';
import Image from 'next/image';

function EventItem(props) {
    const { item } = props;
    const humanReadableDate = new Date(item.date).toLocaleDateString('fr-Fr', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formattedAddress = item.location.replace(', ', '\n');
    const exploreLink = `/events/${item.id}`;
    return <li>
        <Image src={'/' + item.image} width="100" height="100" alt={item.title} />
        <div>
            <h2>{item.title}</h2>
        </div>
        <div>
            <time>{humanReadableDate}</time>
        </div>
        <div>
            <address>{formattedAddress}</address>
        </div>
        <div>
            <Link href={exploreLink}>EXPLORE EVENTS</Link>
        </div>


        {item.title}</li>
}

export default EventItem;