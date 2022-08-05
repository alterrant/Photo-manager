import { useState } from 'react';

import ProgressBar from './progress-bar/progress-bar';
import { SVGLoader } from '../assets/svg/loader';

export function PhotoLoader() {
    const [file, setFile] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const allowedTypes = ['image/png', 'image/jpeg'];

    const handleChange = (e: any) => {
        const selectFile = e.target.files[0];

        if (selectFile && allowedTypes.includes(selectFile.type)) {
            setFile(selectFile);
            setError('');
        } else {
            setFile(null);
            setError('Please choose png or jpeg file');
        }
    };

    return (
        <>
            <div className='wrapper-input'>
                <input className='inputfile' type='file' onChange={handleChange} id='inputImage' />
                <label className='inputImage' htmlFor='inputImage'>
                    <SVGLoader />
                </label>
            </div>
            <div className='output'>
                {error && <div className='error'>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </>
    );
}
