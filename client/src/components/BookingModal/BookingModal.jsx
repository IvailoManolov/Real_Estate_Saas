import React, { useContext, useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useMutation } from 'react-query';

import UserDetailContext from '../../context/UserDetailContext';
import { bookVisit } from '../../utils/api';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const BookingModal = ({ opened, setOpen, email, propertyId }) => {

    const [value, setValue] = useState(null);
    const { userDetails: { token }, setUserDetails } = useContext(UserDetailContext);

    const handleBookingSuccess = () => {
        toast.success('You have booked your visit!', {
            position: 'top-right'
        });

        setUserDetails((prev) => ({
            ...prev,
            bookings: [
                ...prev.bookings,
                {
                    id: propertyId,
                    date: dayjs(value).format('DD/MM/YYYY')
                }
            ]
        }))
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: () => bookVisit(value, propertyId, email, token),
        onSuccess: () => handleBookingSuccess(),
        onError: (({ response }) => toast.error(response.data.message)),
        onSettled: () => setOpen(false),
    });

    const handleDateChange = (newDates) => {
        setValue(newDates);
    };

    return (
        <Modal
            opened={opened}
            onClose={() => setOpen(false)}
            title='Select your date of visit'
            centered >

            <div className='flexColCenter' style={{ gap: '1rem' }}>
                <DatePicker
                    onChange={handleDateChange}
                    minDate={new Date()}
                    value={value} />

                <Button
                    onClick={() => mutate()}
                    disabled={!value}
                >
                    Book visit
                </Button>
            </div>

        </Modal>
    )
}

export default BookingModal