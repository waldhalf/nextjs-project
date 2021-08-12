import Link from 'next/link';
import classes from './MainHeader.module.css';
function MainHeader() {
    return <header className={classes.header}>
        <div>
            <Link href="/">Next Events</Link>
        </div>
        <nav>
            <ul>
                <li>
                    <Link href="/events">All events</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default MainHeader;