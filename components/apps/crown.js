import React from 'react';

export const displayCrown = () => (
    <iframe
        className="h-full w-full"
        src="https://crown-toolkit.vercel.app/"
        title="CROWN MRI Segmentation"
        frameBorder="0"
    />
);

export const displayCrownDicom = () => (
    <iframe
        className="h-full w-full"
        src="https://crown-dicom.vercel.app/"
        title="CROWN DICOM to NIfTI"
        frameBorder="0"
    />
);

export default displayCrown;
