import ReactQuill from "react-quill";

interface CommentDropDownProps {
  comments: any[];
  selectedSentencesIntoTextArea: string;
  setSelectedSentencesIntoTextArea: React.Dispatch<
    React.SetStateAction<string>
  >;
}
const TextAreaForComments: React.FC<CommentDropDownProps> = ({
  comments,
  selectedSentencesIntoTextArea,
  setSelectedSentencesIntoTextArea,
}) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const getRandomComments = (count: number) => {
    if (selectedSentencesIntoTextArea !== null) {
      setSelectedSentencesIntoTextArea("");
    }

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * comments.length);
      const propertyname = Object.keys(comments[0])[i + 1] as keyof any;
      // console.log("randomindex = " + randomIndex);
      // console.log("propertyname = " + propertyname.toString());
      // console.log(
      //   "comment #  " + i + "   " + comments[randomIndex][propertyname]
      // );
      // console.log(comments.length);
      if (selectedSentencesIntoTextArea == null) {
        setSelectedSentencesIntoTextArea(
          comments[randomIndex][propertyname].toString().trim()
        );
      } else {
        setSelectedSentencesIntoTextArea((previousValue) =>
          (
            previousValue +
            " " +
            comments[randomIndex][propertyname].toString().trim()
          ).replace(/[\[\](){}]/g, "")
        );
      }

      // console.log(comments[randomIndex][propertyname]);
    }
  };

  return (
    <>
      <br />
      <div className="ContentComponentBody">
        <div className="TextAreaForComments_Grid">
          <div>
            <ReactQuill
              theme="snow"
              modules={modules}
              className="reactQuill"
              value={selectedSentencesIntoTextArea}
              onChange={(value) => setSelectedSentencesIntoTextArea(value)}
            />
            <br />
            <br />
            <br />
            <div>
              <input
                className="btn btn-primary btn-lg"
                type="button"
                value="Random Comment"
                onClick={() => {
                  getRandomComments(4);
                }}
                style={{ marginRight: "15px" }}
              />
              <input
                className="btn btn-secondary btn-lg"
                type="button"
                value="Clear Comment"
                onClick={() => {
                  setSelectedSentencesIntoTextArea("");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextAreaForComments;
