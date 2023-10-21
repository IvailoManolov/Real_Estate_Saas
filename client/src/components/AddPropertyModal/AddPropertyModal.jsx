import { Container, Modal, Stepper } from '@mantine/core'
import React, { useState } from 'react'
import AddLocation from '../AddLocation/AddLocation';
import { useAuth0 } from '@auth0/auth0-react';
import UploadImage from '../UploadImage/UploadImage';
import BasicDetails from '../BasicDetails/BasicDetails';

const AddPropertyModal = ({ opened, setOpened }) => {

    const [active, setActive] = useState(0);
    const { user } = useAuth0();

    const [propertyDetails, setPropertyDetails] = useState({
        title: '',
        description: '',
        price: 0,
        country: '',
        city: "",
        address: "",
        image: null,
        facilities: {
            bedrooms: 0,
            parkings: 0,
            bathrooms: 0
        },
        userEmail: user?.email
    });

    const nextStep = () => {
        setActive((currentStep) => (currentStep < 4 ? currentStep + 1 : currentStep));
    }

    const prevStep = () => {
        setActive((currentStep) => (currentStep > 0 ? currentStep - 1 : currentStep));
    }

    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            closeOnClickOutside
            size={'90rem'}
        >
            <Container h={'40rem'} w={'100%'} >
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>

                    <Stepper.Step label="Property Location" description="Address">
                        <AddLocation
                            nextStep={nextStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails} />
                    </Stepper.Step>

                    <Stepper.Step label="Images" description="Upload">
                        <UploadImage
                            nextStep={nextStep}
                            prevStep={prevStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                        />
                    </Stepper.Step>

                    <Stepper.Step label="Basic" description="Details">
                        <BasicDetails
                            nextStep={nextStep}
                            prevStep={prevStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails} />
                    </Stepper.Step>

                    <Stepper.Step>

                    </Stepper.Step>

                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>
            </Container>
        </Modal>
    )
}

export default AddPropertyModal