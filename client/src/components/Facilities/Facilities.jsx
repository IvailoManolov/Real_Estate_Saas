import { Box, Button, Center, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'

const Facilities = ({ nextStep, prevStep, propertyDetails, setPropertyDetails }) => {

    const form = useForm({
        initialValues: {
            bedrooms: propertyDetails?.bedrooms,
            parkings: propertyDetails?.parkings,
            bathrooms: propertyDetails?.bathrooms
        },

        validate: {
            bedrooms: (value) => (value < 1 ? "Must have at least one bedroom" : null),
            bathrooms: (value) => (value < 1 ? "Must have at least one bathroom" : null),
        }
    });

    const { bedrooms, parkings, bathrooms } = form.values;

    const handleSubmit = () => {
        const { hasErrors } = form.validate();

        if (!hasErrors) {
            setPropertyDetails((prev) => ({
                ...prev,
                facilities: { bedrooms, parkings, bathrooms },
            }));
        }
    }

    return (
        <Box maw="30%" mx="auto" my="sm">

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <NumberInput
                    size='md'
                    withAsterisk
                    label='Bedrooms Count'
                    min={0}
                    {...form.getInputProps('bedrooms')}
                />

                <NumberInput
                    size='md'
                    withAsterisk
                    label='Parkings Count'
                    min={0}
                    {...form.getInputProps('parkings')}
                />

                <NumberInput
                    size='md'
                    withAsterisk
                    label='Bathrooms Count'
                    min={0}
                    {...form.getInputProps('bathrooms')}
                />



                <Center position='center' mt='xl'>
                    <Button type='submit'>
                        Next
                    </Button>
                </Center>
            </form>

        </Box>
    )
}

export default Facilities