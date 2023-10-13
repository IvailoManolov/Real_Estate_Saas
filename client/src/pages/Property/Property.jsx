import React, { useContext, useState } from 'react';

import "./Property.css";

import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../../utils/api';

import { removeBooking } from '../../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart, AiFillCar } from 'react-icons/ai';

import { MdLocationPin, MdOutlineMeetingRoom } from 'react-icons/md';
import { FaShower } from 'react-icons/fa';
import Map from '../../components/Map/Map';
import useAuthCheck from '../../hooks/useAuthCheck';

import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../../components/BookingModal/BookingModal';
import UserDetailContext from '../../context/UserDetailContext';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';


const Property = () => {
    const { pathname } = useLocation();

    const id = pathname.split("/").slice(-1)[0];

    const { data, isLoading, isError } = useQuery(['resd', id], () => getProperty(id))
    const [modalOpened, setModalOpened] = useState(false);
    const { validateLogin } = useAuthCheck();
    const { user } = useAuth0();

    const { userDetails: { token, bookings }, setUserDetails } = useContext(UserDetailContext);

    const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
        mutationFn: () => removeBooking(id, user?.email, token),
        onSuccess: () => {
            setUserDetails((prev) => ({
                ...prev,
                bookings: prev.bookings.filter((booking) => booking?.id !== id)
            }));
            toast.success('Booking cancelled', { position: 'top-right' });
        }
    });


    if (isLoading) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <PuffLoader />
                </div>
            </div>
        )
    }

    if (isError) {
        <div className="wrapper">
            <div className="flexCenter paddings">
                <span>
                    Error while fetching the property details!
                </span>
            </div>
        </div>
    }

    return (
        <div className='wrapper'>
            <div className="flexColStart paddings innerWidth property-container">

                {/* Like Button */}
                <div className="like">
                    <AiFillHeart size={30} color='white' />
                </div>

                {/* Image */}
                <img src={data?.image} alt='property image' />

                <div className="flexCenter property-details">

                    {/* Left */}
                    <div className="flexColStart left">

                        {/* Head */}
                        <div className='flexStart head'>
                            <span className='primaryText'>{data?.title}</span>
                            <span className='orangeText' style={{ fontSize: '1.5rem' }}>${data?.price}</span>
                        </div>

                        {/* Facilities */}
                        <div className="flexStart facilities">

                            {/* Bathrooms */}
                            <div className="flexStart facility">
                                <FaShower size={20} color='#1f3e72' />
                                <span>
                                    {data?.facilities?.bathrooms} Bathrooms
                                </span>
                            </div>

                            {/* Rooms */}
                            <div className="flexStart facility">
                                <MdOutlineMeetingRoom size={20} color='#1f3e72' />
                                <span>
                                    {data?.facilities?.bedrooms} Rooms
                                </span>
                            </div>

                            {/* Parking */}
                            <div className="flexStart facility">

                                <AiFillCar size={20} color='#1f3e72' />
                                <span>
                                    {data?.facilities?.parkings} Parking
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <span className='secondaryText' style={{ textAlign: "justify" }}>
                            {data?.description}
                        </span>

                        {/* Address */}
                        <div className='flexStart' style={{ gap: '1rem' }}>
                            <MdLocationPin size={25} />
                            <span className='secondaryText' >
                                {
                                    data?.address
                                }
                                {
                                    data?.city
                                }
                                {
                                    data?.country
                                }
                            </span>
                        </div>

                        {/* Booking Button */}
                        {
                            bookings?.map((booking) => booking.id).includes(id) ?
                                (
                                    <>
                                        <Button onClick={() => cancelBooking()} variant='outline' w={'100%'} color='red' disabled={cancelling}>
                                            <span>Cancel booking</span>
                                        </Button>
                                        <span>
                                            Your visit already booked for {bookings?.filter((booking) => booking?.id === id)[0].date}
                                        </span>
                                    </>
                                ) :
                                (
                                    <>
                                        <button className='button'
                                            onClick={() => {
                                                validateLogin() && setModalOpened(true);
                                            }}
                                        >
                                            Book your visit
                                        </button>
                                    </>
                                )
                        }

                        <BookingModal
                            opened={modalOpened}
                            setOpen={setModalOpened}
                            propertyId={id}
                            email={user?.email}
                        />

                    </div>

                    {/* Right */}
                    <div className='right'>
                        <Map
                            address={data?.address}
                            city={data?.city}
                            country={data?.country} />

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Property