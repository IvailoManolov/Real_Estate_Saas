import React from 'react';
import { Modal } from '@mantine/core';

const BookingModal = ({ opened, setOpen, email, propertyId }) => {
    return (
        <Modal
            opened={opened}
            setOpened={setOpen}
            title='Select your date of visit'
            centered >

            <div>
                <span>

                </span>
            </div>

        </Modal>
    )
}

export default BookingModal