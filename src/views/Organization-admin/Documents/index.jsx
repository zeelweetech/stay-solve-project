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
        <div className="flex items-center border p-2 rounded-2"> {/* Container for the button and file name */}
          <label
            htmlFor="file-upload"
            className="inline-block cursor-pointer bg-blue-500 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center mr-2"
            style={{ width: "150px" }} 
          >
            Choose a file
            <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
          </label>
          {fileName && <p className="text-black-600 mt-2"> {fileName}</p>}
        </div>
      </Card>
    </div>
  )
  }
export default Index;
