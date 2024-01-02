import React, { useEffect, useState, useRef, RefObject } from "react";
import "../CSS/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import CommentDropDown from "../Components/CommentDropDowns";
import TextAreaForComments from "../Components/TextAreaForComments";
import StudentInformationNameGenderSubject from "../Components/StudentInformationNameGenderSubject";

export interface IComments {
  id: number;
  introduction: string;
  behavior: string;
  listening: string;
  comprehension: string;
  subject: string;
  conclusion: string;
}

const Home: React.FC = () => {
  const [allComments, setAllComments] = useState<Array<IComments>>([]);
  const selectRefs = useRef<Array<RefObject<HTMLSelectElement>>>([]);
  const buttonRefs = useRef<Array<RefObject<HTMLInputElement>>>([]);
  const [selectedSentencesIntoTextArea, setSelectedSentencesIntoTextArea] =
  useState("");

  const [sizeOfArray, setSizeOfArray] = useState(0);
  const [selectedName, setSelectedName] = useState("(name)");

  const generateComments = (): IComments[] => {
    return [
      {
        id: 1,
        introduction: "(name) assumes responsibility well and has a fine attitude towards learning.",
        behavior: "[He/She] is cooperative and happy.",
        listening: "[He/She] listens to the teacher well and follows instructions accurately and obediently.",
        comprehension: "[He/She] learns new material quickly and is making good progress.",
        subject: "(Name) has exhibited only a basic understanding of the {subject} material we have covered in class.",
        conclusion: "Great attitude (name)!",
      },
      {
        id: 2,
        introduction: "(name) is very curious and interested in the lessons we learned in class.",
        behavior: "[He/She] always makes a big effort to complete the class work and homework carefully and accurately.",
        listening: "[He/She] listens attentively and usually understands what I'm explaining to the class.",
        comprehension: "(name) demonstrates [his/her] understanding of new materials by always providing an answer to the teacher's questions.",
        subject: "(Name) has exhibited a thorough understanding of the (subject) topics we have been studying.",
        conclusion: "[He/She] has an excellent understanding of the lesson material. Keep up the good work, (name)!",
      },
      {
        id: 3,
        introduction: "(name) is a wonderful child to have in class.",
        behavior: "[He/She] is very curious and interested in [his/her] lessons.",
        listening: "I appreciate (name)'s ability to focus and actively engage in our lessons through attentive listening.",
        comprehension: "[He/She] should be proud of [his/her] progress and understanding of the lesson content.",
        subject: "(Name) has proven to have a solid grasp of the (subject) material we have been studying.",
        conclusion: "Excellent progress (name)!",
      },
      {
        id: 4,
        introduction: "is an intelligent student with a respectful attitude towards learning.",
        behavior: "has a fantastic attitude towards learning and being a good citizen of the class.",
        listening: "I've noticed that (name) excels in listening to instructions and follows them with precision.",
        comprehension: "[He/She] should be happy with [his/her] progress and understanding of the lesson content as (he/she) is doing very well.",
        subject: "(Name) has demonstrated a vital understanding of the {subject} material we have been studying.",
        conclusion: "Excellent progress (name)!",
      },
    ];
  };

  // const fetchAllComments = async () => {
  //   const request = await fetch("https://localhost:7041/Table1");
  //   const data: IComments[] = await request.json();
  //   setAllComments(data);
  //   setSizeOfArray(Object.keys(data[0]).length);
  // };

  useEffect(() => {
    // fetchComments();
    // fetchAllComments();

    const comments = generateComments();
    setAllComments(comments);
    setSizeOfArray(Object.keys(comments[0]).length);

    selectRefs.current = Array.from({ length: sizeOfArray }, () =>
      React.createRef()
    );
    buttonRefs.current = Array.from({ length: sizeOfArray }, () =>
      React.createRef()
    );
  }, [sizeOfArray]);

  

  return (
    <>
      {/* <div className="container" style={{ border: "solid" }}> */}
        <div>
          <br/>
          <StudentInformationNameGenderSubject 
            comments={allComments}
            setSelectedName={setSelectedName}
            setAllComments={setAllComments}
          />
          <br />

         
            <CommentDropDown
              comments={allComments}
              selectRefs={selectRefs.current}
              buttonRefs={buttonRefs.current}
              selectedSentencesIntoTextArea={selectedSentencesIntoTextArea}
              setSelectedSentencesIntoTextArea={
                setSelectedSentencesIntoTextArea
              }
            />
         
            <TextAreaForComments
            comments={allComments}
            selectedSentencesIntoTextArea={selectedSentencesIntoTextArea}
            setSelectedSentencesIntoTextArea={
              setSelectedSentencesIntoTextArea
            }
            />
        </div>
    </>
  );
};

export default Home;
