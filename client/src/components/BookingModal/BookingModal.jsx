import React, { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const BookingModal = ({ opened, setOpen, email, propertyId }) => {

    const [value, setValue] = useState([null, null]);

    const handleDateChange = (newDates) => {
        console.log(newDates)
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
                    type="range"
                    allowSingleDateInRange
                    value={value} />
                <Button>
                    Book visit
                </Button>
            </div>

        </Modal>
    )
}

export default BookingModal