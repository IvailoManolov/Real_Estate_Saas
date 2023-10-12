import React, { useContext, useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useMutation } from 'react-query';

import UserDetailContext from '../../context/UserDetailContext';
import { bookVisit } from '../../utils/api';

const BookingModal = ({ opened, setOpen, email, propertyId }) => {

    const [value, setValue] = useState(null);
    const { userDetails: { token } } = useContext(UserDetailContext);

    const { mutate, isLoading } = useMutation({
        mutationFn: () => bookVisit(value, propertyId, email, token)
    })

    const handleDateChange = (newDates) => {
        setValue(newDates);
    };

    return (
        <Modal
            opened={opened}
            onClose={() => setOpen(false)}
            title='Select your date of visit'
            centered >

            <div className='flexColCenter'>
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