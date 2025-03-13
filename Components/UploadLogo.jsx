import React, { useState, useContext, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
// internal
import UploadICON from "./SVG/UploadICON";

const UploadLogo = ({
  imageURL,
  setimageURL,
  setloader,
  PINATA_API_KEY,
  PINATA_SECRECT_KEY,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 200 });
  const notifyError = (msg) => toast.error(msg, { duration: 200 });

  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setloader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRECT_KEY, 
            "Content-Type": "multipart/form-data",
          },
        });

        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setimageURL(url);
        setloader(false);
        notifySuccess("Logo uploaded successfully");

        
        console.log("Pinata Response:", response.data);
      } catch (error) {
        setloader(false);
        notifyError("Check your Pinata API keys");
        console.error("Upload Error:", error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    await uploadToIPFS(acceptedFiles[0]);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxSize: 500000000000,
    multiple: false,
  });

  return (
    <>
      {imageURL ? (
        <div>
          <img
            src={imageURL}
            style={{ width: "200px", height: "auto" }}
            alt=""
          />
        </div>
      ) : (
        <div {...getRootProps()}>
          <label htmlFor="file" className="custum-file-upload">
            <div className="icon">
              <UploadICON />
            </div>
            <div className="text">
              <span>Click to upload Logo</span>
            </div>
            <input type="file" id="file" {...getInputProps()} />
          </label>
        </div>
      )}
    </>
  );
};

export default UploadLogo;
