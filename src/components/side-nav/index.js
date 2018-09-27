import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import Match from 'preact-router/match';
import Card from '../card'

import {routes} from '../app'

const SideNav = (props) => {
	return (
		<Card cardClass={style.menuWrapper}>
			<Match>
				{ ({ url }) => {
					return (
						<nav>
                            <ul class = {style.mainList}>
                                <li><Link activeClassName={style.active} href={routes.REQUESTS}>
                                    Pending requests</Link></li>
                                <li class={url.indexOf(routes.USERS) == 0 && style.active} style={{cursor: 'default'}}>
                                    User management</li>
                                <li>
                                    <ul class = {style.subList}>
                                        <li><Link activeClassName={style.active} href={routes.ACTIVE_USERS}>
                                            Active users</Link></li>
                                        <li><Link activeClassName={style.active} href={routes.ARCHIVED_USERS}>
                                            Archived users</Link></li>
                                        <li><Link activeClassName={style.active} href={routes.INCOMPLETE_REGISTRATIONS}>
                                            Incomplete registration</Link></li>
                                    </ul>
                                </li>
                                <li><Link activeClassName={style.active} href={routes.TRANSACTIONS}>
                                    Transaction management</Link></li>
                                <li><Link activeClassName={style.active} href={routes.INVITES}>
                                    Invites</Link></li>
                                <li><Link activeClassName={style.active} href={routes.PERMISSIONS}>
                                    Permission management</Link></li>
                            </ul>
						</nav>
					)
				}}
			</Match>
		</Card>
	)
};

export default SideNav;
