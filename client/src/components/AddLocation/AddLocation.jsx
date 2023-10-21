import React from 'react';
import { useForm } from '@mantine/form';
import { validateString } from '../../utils/common';
import { Button, Group, Select, TextInput } from '@mantine/core';
import useCountries from '../../hooks/useCountries';

import Map from '../Map/Map';

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {

    const { getAll } = useCountries();

    const form = useForm({
        initialValues: {
            country: propertyDetails?.country,
            city: propertyDetails?.city,
            address: propertyDetails?.address
        },

        validate: {
            country: (value) => validateString(value),
            city: (value) => validateString(value),
            address: (value) => validateString(value)
        }
    });

    const { country, city, address } = form.values;

    const handleSubmit = () => {
        const { hasErrors, errors } = form.validate();

        if (!hasErrors) {
            setPropertyDetails((prev) => ({ ...prev, city, address, country }));
            nextStep();
        }
        else {
            console.error('Failed to move forward! Please check input fields on location');
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>

            <div className="flexCenter" style={{
                justifyContent: 'space-between',
                gap: '3rem',
                marginTop: '1rem',
                flexDirection: 'row',
            }}>

                {/* Left side */}
                <div className="flexColStart" style={{ flex: 0.5, gap: '1rem' }}>
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

                    <TextInput w={'100%'}
                        withAsterisk
                        label='City'
                        {
                        ...form.getInputProps('city', { type: 'input' })
                        }
                    />

                    <TextInput w={'100%'}
                        withAsterisk
                        label='Address'
                        {
                        ...form.getInputProps('address', { type: 'input' })
                        }
                    />
                    <Button
                        fullWidth
                        type='submit'>Verify Location
                    </Button>
                </div>

                {/* Right side */}
                <div style={{ flex: 1 }}>
                    <Map
                        address={address}
                        city={city}
                        country={country} />
                </div>
            </div>

        </form >
    )
}

export default AddLocation