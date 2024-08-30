import React, { useEffect, useState } from "react";
import { GET_FILE } from "../routes/Routes";

const Material = ({ fileId }) => {
  const [downloading, setDownloading] = useState(false);
  const [material, setMaterial] = useState(null);

  const handleDownload = () => {
    setDownloading(true);
    const url = window.URL.createObjectURL(new Blob([material?.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", material.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  const getFile = async () => {
    const response = await fetch(`${GET_FILE}/${fileId}`);
    const data = await response.blob();
    const filedetails = response.headers.get("fileDetails");
    const [filename, _, fileType] = filedetails.split(", ");
    const file = new File([data], filename, { type: fileType });
    setMaterial(file);
  };

  useEffect(() => {
    getFile();
  }, []);
  return (
    <div className="card">
      <h5 className="card-header">{material?.name}</h5>
      <div className="card-body d-flex align-items-center justify-content-between">
        <p>
          Size: {(parseInt(material?.size) / (1024 * 1024)).toFixed(2)}
          {" MB"}
        </p>
        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default Material;
