import React, { ChangeEvent, useState, FormEvent } from 'react';
import { InputBase } from '@material-ui/core';
import axios from 'axios';

const TestPage = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      [...file].forEach((element: File) => {
        formData.append('image', element);
      });
      console.log([...formData]);
    }
    axios.post('http://localhost:3000/uploadfile', formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default TestPage;
