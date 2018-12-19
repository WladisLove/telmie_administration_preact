import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import Match from 'preact-router/match';
import Card from '../card'
import SubMenu from './sub-menu'

import {routes} from '../app'

class SideNav extends Component{
    constructor(props){
        super(props);

        this.subMenuLinks = {
            'pending_requests': [{
                route: routes.PRO_REQUESTS,
                name: 'Pro applications'
            },{
                route: routes.WITHDRAWALS,
                name: 'Withdrawals'
            }],
            'user_management': [{
                route: routes.ACTIVE_USERS,
                name: 'Active users'
            },{
                route: routes.ARCHIVED_USERS,
                name: 'Archived users'
            },{
                route: routes.INCOMPLETE_REGISTRATIONS,
                name: 'Incomplete registration'
            }],
            'transaction_management': [{
                route: routes.TRANSACTIONS,
                name: 'Transactions'
            },{
                route: routes.VARIABLES_SETTINGS,
                name: 'Variables settings'
            }]
        }

        let key = (() => {
            let pathname = document.location.pathname,
                _key = '';

            Object.keys(this.subMenuLinks).some(el => {
                return this.subMenuLinks[el].some(el1 => {
                    return el1.route.indexOf(pathname) != -1 ? (_key = el, true) : false;
                });
            });

            return _key;
        })();

        this.state = {
            menuKey: key,
            selectedMenuKey: key,
        }
    }

    onSelectSubMenu = (menuKey, isForActive = false) => {
        isForActive && this.props.isUserSelected && this.props.clearSelectedUser();
        isForActive && this.props.isPendingSelected && this.props.unselectPending();
        isForActive ? 
            this.setState({ menuKey })
            :
            this.setState({ selectedMenuKey: menuKey })
    }

    resetMenuSelection = () => {
        this.setState({ selectedMenuKey: '', menuKey: '' })
    }

    render(props){

        const {menuKey,selectedMenuKey} = this.state;

        return (
            <Card cardClass={`${style.menuWrapper} side-nav`}>
                <Match>
                    { () => {
                        return (
                            <nav>
                                <ul class = {style.mainList}>
                                    
                                    <SubMenu menuKey='pending_requests' 
                                        activeMenuKey={menuKey}
                                        selectedMenuKey={selectedMenuKey}
                                        links={this.subMenuLinks.pending_requests}
                                        onSelect={this.onSelectSubMenu}>Pending requests</SubMenu>

                                    <SubMenu menuKey='user_management' 
                                        activeMenuKey={menuKey}
                                        selectedMenuKey={selectedMenuKey}
                                        links={this.subMenuLinks.user_management}
                                        onSelect={this.onSelectSubMenu}>User management</SubMenu>
    
                                    <SubMenu menuKey='transaction_management' 
                                        activeMenuKey={menuKey}
                                        selectedMenuKey={selectedMenuKey}
                                        links={this.subMenuLinks.transaction_management}
                                        onSelect={this.onSelectSubMenu}>Transaction management</SubMenu>
    
                                    <li><Link activeClassName={style.active} onClick={this.resetMenuSelection} href={routes.INVITES}>
                                        Invites</Link></li>
                                    <li><Link activeClassName={style.active} onClick={this.resetMenuSelection} href={routes.CALLS}>
                                        Calls</Link></li>
                                    <li><Link activeClassName={style.active} onClick={this.resetMenuSelection} href={routes.PERMISSIONS}>
                                        Permission management</Link></li>
                                </ul>
                            </nav>
                        )
                    }}
                </Match>
            </Card>
        )
    }
	
};

export default SideNav;
