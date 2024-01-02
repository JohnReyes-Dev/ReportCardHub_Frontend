import * as XLSX from "xlsx";
import React, { useState, useRef, RefObject } from "react";
import "react-quill/dist/quill.snow.css";
import CommentDropDown from "../Components/CommentDropDowns";
import TextAreaForComments from "../Components/TextAreaForComments";
import "../CSS/AddYourOwnComments.css";
import StudentInformationNameGenderSubject from "../Components/StudentInformationNameGenderSubject";
import DownloadButtonLogo from "../assets/download_icon.svg";

const AddYourOwnComments: React.FC = () => {
  const [data, setData] = useState<unknown[]>([]);
  const selectRefs = useRef<Array<RefObject<HTMLSelectElement>>>([]);
  const buttonRefs = useRef<Array<RefObject<HTMLInputElement>>>([]);
  const [selectedSentencesIntoTextArea, setSelectedSentencesIntoTextArea] =
    useState("");
  // const [sizeOfArray, setSizeOfArray] = useState(0);
  const [, setSelectedName] = useState("(name)");

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Access the data from the workbook
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // const parsedData = XLSX.utils.sheet_to_json(sheet);
        const parsedData = XLSX.utils.sheet_to_json(sheet, {
          defval: "", // Default value for skipped cells.
          blankrows: false,
        });

        setData(parsedData);

        // Determine the size of the array
        const sizeOfArray = Object.keys(parsedData[0] as any).length;

        // Create refs based on the size of the array
        selectRefs.current = Array.from({ length: sizeOfArray }, () =>
          React.createRef()
        );
        buttonRefs.current = Array.from({ length: sizeOfArray }, () =>
          React.createRef()
        );
      };
    }
  };

  return (
    <>
    <br/>
    <div className="ContentComponentBody">

      <div style={{ backgroundColor: '#6C8EBF', textAlign: 'center' }}>
              <label className="LabelForContentBody">Steps To Create Comments</label>
            </div>
      <div className="stepsToCreateOwnCommentsDiv">
        
        <label>Step 1: </label>
        <a
          href="https://github.com/JohnReyes-Dev/SchoolCommentGenerator/raw/main/CommentTemplate.xlsx"
          download
        >
          <button className="btn btn-outline-primary">
            <img
              src={DownloadButtonLogo}
              aria-hidden="true"
              style={{ marginRight: "10px" }}
            ></img>
            Download Comment Template
          </button>
        </a>

        <label style={{ marginTop: "30px" }}>Step 2: </label>
        <input
          style={{ marginTop: "30px" }}
          type="file"
          id="avatar"
          name="avatar"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </div>

      {data.length > 0 && (
        <div>
          <br />
          <StudentInformationNameGenderSubject
            comments={data as any[]}
            setSelectedName={setSelectedName}
            setAllComments={setData}
          />

          <br />
          <CommentDropDown
            comments={data as any[]} // Replace YourDataType with the actual type
            selectRefs={selectRefs.current}
            buttonRefs={buttonRefs.current}
            selectedSentencesIntoTextArea={selectedSentencesIntoTextArea}
            setSelectedSentencesIntoTextArea={setSelectedSentencesIntoTextArea}
          />

          <TextAreaForComments
            comments={data as any[]} // Replace YourDataType with the actual type
            selectedSentencesIntoTextArea={selectedSentencesIntoTextArea}
            setSelectedSentencesIntoTextArea={setSelectedSentencesIntoTextArea}
          />
        </div>
      )}
    </div>
    </>
  );
};

export default AddYourOwnComments;
