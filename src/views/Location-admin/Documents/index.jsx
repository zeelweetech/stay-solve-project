import Card from "components/card";
import React, { useState } from "react";

function Index() {

  const [fileName, setFileName] = useState(""); // State to hold the selected file name

  // Function to handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file
    if (selectedFile) {
      setFileName(selectedFile.name); // Update the state with the selected file name
    }
  };

  return (
    <div>
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 mt-8">
        <h2 className="text-xl font-bold mb-4 d-flex align-start">Upload Documents</h2>
        <div className="flex items-center border p-2 rounded-lg">
          <label
            htmlFor="file-upload"
            className="inline-block rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            style={{ width: "150px" }} 
          >
            Choose a file
            <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
          </label>
          {fileName && <p className="text-black-600 mt-2"> {fileName}</p>}
        </div>
        <div>
          <button className="ms-2 mt-5 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">
            Upload File
          </button>
        </div>
      </Card>

      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 mt-5">
      
      </Card>
    </div>
  )
  }
export default Index;
