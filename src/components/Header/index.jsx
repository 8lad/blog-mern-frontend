import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slices/auth';
import {
	APP_ROUTE_ADD_POST,
	APP_ROUTE_LOGIN,
	APP_ROUTE_REGISTER,
	APP_ROUTE_ROOT
} from '../../constants';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const onClickLogout = () => {
		dispatch(logout());
		window.localStorage.removeItem('token');
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to={APP_ROUTE_ROOT}>
						<div>MERN BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to={APP_ROUTE_ADD_POST}>
									<Button variant="contained">Write a post</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Log out
								</Button>
							</>
						) : (
							<>
								<Link to={APP_ROUTE_LOGIN}>
									<Button variant="outlined">Log in</Button>
								</Link>
								<Link to={APP_ROUTE_REGISTER}>
									<Button variant="contained">Sing in</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
