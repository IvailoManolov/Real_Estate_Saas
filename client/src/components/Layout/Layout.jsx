import React, { useContext, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../context/UserDetailContext'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'

const Layout = () => {

    const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
    const { setUserDetails } = useContext(UserDetailContext);

    const { mutate } = useMutation({
        mutationKey: [user?.email],
        mutationFn: (token) => createUser(user?.email, token)
    })

    useEffect(() => {

        const getTokenAndRegister = async () => {

            const res = await getAccessTokenWithPopup({
                authorizationParams: {
                    audience: "http://localhost:8080",
                    scope: "openid profile email",
                },
            });
            console.log(res);

            localStorage.setItem("access_token", res);
        }

        isAuthenticated && getTokenAndRegister();

    }, [isAuthenticated]);

    return (
        <>
            <div style={{ background: "var(--black)", overflow: 'hidden' }}>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout