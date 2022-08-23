import { useState } from 'react';

import { ProgressBar } from './progress-bar';
import { SVGLoader } from '../assets/svg/loader';

export const PhotoLoader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const allowedTypes = new Set(['image/png', 'image/jpeg']);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const selectFile = event.currentTarget.files![0];

    if (selectFile && allowedTypes.has(selectFile.type)) {
      setFile(selectFile);
      setError('');
    } else {
      setFile(null);
      setError('Please choose png or jpeg file');
    }
  };

  return (
    <>
      <div className="wrapper-input">
        <input className="inputfile" type="file" onChange={handleChange} id="inputImage" />
        <label className="inputImage" htmlFor="inputImage">
          <SVGLoader />
        </label>
      </div>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file !== null && <div>{file.name}</div>}
        {file !== null && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </>
  );
};
