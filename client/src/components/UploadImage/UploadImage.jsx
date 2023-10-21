import React, { useEffect, useRef, useState } from 'react';

import { AiOutlineCloudUpload } from 'react-icons/ai';

import './UploadImage.css';
import { Button, Group } from '@mantine/core';

const UploadImage = ({ nextStep, prevStep, propertyDetails, setPropertyDetails }) => {

    const [imageUrl, setImageUrl] = useState(propertyDetails.image);

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dgp9mua0h",
                uploadPreset: "f4tq0iis",
                maxFiles: 1
            },
            (err, result) => {
                if (result.event === 'success') {
                    setImageUrl(result.info.secure_url);
                }
            }
        )
    }, []);

    const handleNext = () => {
        setPropertyDetails((prev) => ({ ...prev, image: imageUrl }));
        nextStep();
    }

    return (
        <div className='flexColCenter uploadWrapper'>
            {
                !imageUrl ? (
                    <div className='flexColCenter uploadZone'
                        onClick={() => widgetRef.current?.open()}
                    >
                        <AiOutlineCloudUpload size={50} color='grey' />
                        <span>Upload Image</span>
                    </div>
                ) : (
                    <div className='uploadedImage'
                        onClick={() => widgetRef.current?.open()}>
                        <img src={imageUrl}
                            alt=''
                        />
                    </div>
                )
            }

            <Group position="center" mt={'xl'}>
                <Button onClick={handleNext} disabled={!imageUrl}>Next</Button>
            </Group>
        </div>
    )
}

export default UploadImage