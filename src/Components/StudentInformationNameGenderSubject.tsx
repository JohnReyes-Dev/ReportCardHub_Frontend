interface CommentDropDownProps {
  comments: any[];
  setSelectedName: React.Dispatch<React.SetStateAction<string>>;
  setAllComments: React.Dispatch<React.SetStateAction<any[]>>;
}

const StudentInformationNameGenderSubject: React.FC<CommentDropDownProps> = ({
  comments,
  setSelectedName,
  setAllComments,
}) => {
  const NameWasInserted = (name: string) => {
    // const reg = /\(\w+\)/g;
    const reg = /\([a-zA-Z0-9 ]*\)/g;
    setSelectedName(name);
    if (name !== "")
      setAllComments(
        JSON.parse(JSON.stringify(comments).replace(reg, "(" + name + ")"))
      );
    else
      setAllComments(
        JSON.parse(JSON.stringify(comments).replace(reg, "(name)"))
      );
  };

  const ChangeGenderHeOrShe = (gender: string) => {
    const reg = /\[He\/She\]|\[He\]|\[She\]/gi;
    const reg2 = /\[His\/Her\]|\[His\]|\[Her\]/gi;
    if (gender === "He") {
      setAllComments(
        JSON.parse(
          JSON.stringify(comments).replace(reg, "[He]").replace(reg2, "[his]")
        )
      );
    } else if (gender === "She") {
      setAllComments(
        JSON.parse(
          JSON.stringify(comments).replace(reg, "[She]").replace(reg2, "[her]")
        )
      );
    }
  };

  const SubjectNameWasInserted = (subjectName: string) => {
    const reg = /\{[a-zA-Z0-9 ]*\}/g;

    if (subjectName !== "")
      setAllComments(
        JSON.parse(
          JSON.stringify(comments).replace(reg, "{" + subjectName + "}")
        )
      );
    else
      setAllComments(
        JSON.parse(JSON.stringify(comments).replace(reg, "{subject}"))
      );
  };

  return (
    <>
      <div className="ContentComponentBody">
        <form>
          <div>
            <div style={{ backgroundColor: '#6C8EBF', textAlign: 'center' }}>
              <label className="LabelForContentBody">Student Details</label>
            </div>

            <div className="StudentInformation_Grid">
              <label className="grid-item">Gender:</label>
              <div className="grid-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="He"
                    onChange={(e) => ChangeGenderHeOrShe(e.target.value)}
                  />
                  <label className="form-check-label">He</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="She"
                    onChange={(e) => ChangeGenderHeOrShe(e.target.value)}
                  />
                  <label className="form-check-label">She</label>
                </div>
              </div>
            </div>

            <div className="StudentInformation_Grid">
              <label className="grid-item">Student Name:</label>
              <div className="grid-item">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => NameWasInserted(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="StudentInformation_Grid">
              <label className="grid-item"> Class Name: </label>
              <div className="grid-item">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => SubjectNameWasInserted(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentInformationNameGenderSubject;
