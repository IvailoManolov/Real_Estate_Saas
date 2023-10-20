import React from 'react';
import { useForm } from '@mantine/form';
import { validateString } from '../../utils/common';
import { Select } from '@mantine/core';

const AddLocation = ({ propertyDetails, setPropertyDetails }) => {

    const form = useForm({
        initialValues: {
            country: propertyDetails?.country,
            city: propertyDetails?.city,
            address: propertyDetail?.address
        },

        validate: {
            country: (value) => validateString(value),
            city: (value) => validateString(value),
            address: (value) => validateString(value)
        }
    });

    const { country, city, address } = form.values;

    return (
        <form>
            {/* Left side */}
            <div className="flexCenter">
                <div className="flexColStart">
                    <Select
                        w={'100%'}
                        withAsterisk
                        label='Country'
                        clearable
                        searchable
                        data={getAll()}
                        {
                        ...form.getInputProps('country', { type: 'input' })
                        }
                    />
                </div>
            </div>

            {/* Right side */}
        </form>
    )
}

export default AddLocation