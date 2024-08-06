import { Link } from 'react-router-dom';

import './Nav.css';

function Nav() {
	
	return (
		<header>
			<Link to={ '/' }>
				<h1>Book Repo</h1>
			</Link>
		</header>
	);
}

export default Nav;
