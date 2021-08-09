import Image from 'next/image';

import classes from './EventItem.module.css';
import Button from '../ui/Button.js'

import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import RightArrowIcon from '../icons/arrow-right-icon';


function EventItem(props) {
    const { item } = props;
    const humanReadableDate = new Date(item.date).toLocaleDateString('fr-Fr', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formattedAddress = item.location.replace(', ', '\n');
    const exploreLink = `/events/${item.id}`;
    return <li className={classes.item}>
        <Image src={'/' + item.image} width="100" height="100" alt={item.title} />
        <div className={classes.content}>
            <div className={classes.summary}>
                <h2>{item.title}</h2>
            </div>
            <div className={classes.date}>
                <DateIcon></DateIcon>
                <time>{humanReadableDate}</time>
            </div>
            <div className={classes.address}>
                <AddressIcon></AddressIcon>
                <address>{formattedAddress}</address>
            </div>
            <div className={classes.actions}>
                <Button link={exploreLink}>
                    <span>Explore Event</span>
                    <span className={classes.icon}>
                        <RightArrowIcon></RightArrowIcon>
                    </span>
                </Button>
            </div>
        </div>


        {item.title}</li>
}

export default EventItem;