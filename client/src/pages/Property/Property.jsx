import React from 'react';

import "./Property.css";

import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart, AiFillCar } from 'react-icons/ai';

import { MdLocationPin, MdOutlineMeetingRoom } from 'react-icons/md';
import { FaShower } from 'react-icons/fa';
import Map from '../../components/Map/Map';


const Property = () => {
    const { pathname } = useLocation();

    const id = pathname.split("/").slice(-1)[0];

    const { data, isLoading, isError } = useQuery(['resd', id], () => getProperty(id))

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
                        <button className="button">
                            Book your visit!
                        </button>
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
        </div>
    )
}

export default Property