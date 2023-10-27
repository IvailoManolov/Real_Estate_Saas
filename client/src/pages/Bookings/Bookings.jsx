import React, { useContext, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import "../Properties/Properties.css";
import useProperties from "../../hooks/useProperties";
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { PuffLoader } from 'react-spinners';
import "../Properties/Properties.css";
import UserDetailContext from '../../context/UserDetailContext';

const Bookings = () => {
    const { data, isError, isLoading } = useProperties();

    const [filter, setFilter] = useState('');

    const { userDetails: { bookings } } = useContext(UserDetailContext);

    if (isError) {
        return (
            <div className='wrapper'>
                <span>Error while fetching data...</span>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="wrap flexCenter" style={{ height: '60vh' }}>
                <PuffLoader
                    height='80'
                    width='80'
                    radius={1}
                    color='#4066ff'
                    aria-label='puff-loading'
                />
            </div>
        )
    }

    return (
        <div className='wrapper'>
            <div className="flexColCenter
             paddings
              innerWidth
               properties-container">

                <SearchBar filter={filter} setFilter={setFilter} />

                <div className='paddings flexCenter properties'>
                    {
                        data.filter((property) =>
                            bookings.map((booking) => booking.id).includes(property.id))
                            .filter((property) => property.title.toLowerCase().includes(filter.toLowerCase()) ||
                                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                                property.country.toLowerCase().includes(filter.toLowerCase()))
                            .map((card, i) => (
                                <PropertyCard card={card} key={i} />
                            ))
                    }
                </div>


            </div>
        </div>
    )
}

export default Bookings