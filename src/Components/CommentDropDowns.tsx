import React, { RefObject } from "react";

interface CommentDropDownProps {
  comments: any[];
  selectRefs: RefObject<HTMLSelectElement>[];
  buttonRefs: RefObject<HTMLInputElement>[];
  selectedSentencesIntoTextArea: string;
  setSelectedSentencesIntoTextArea: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const hasSpecialCharacters = /[^a-zA-Z0-9]/;

const CommentDropDown: React.FC<CommentDropDownProps> = ({
  comments,
  selectRefs,
  buttonRefs,
  selectedSentencesIntoTextArea,
  setSelectedSentencesIntoTextArea,
}) => {
  return (
    <form>

      <div className="ContentComponentBody">
        
        <div
          className="CommentDropDown_Grid"
          style={{ backgroundColor: '#6C8EBF' }}
        >
          <label className="LabelForContentBody">Category</label>
          <label className="LabelForContentBody">Comment Section</label>
        </div>
        <br/>
        {Object.keys(comments[0] || {}).map(
          (property, index) =>
            property !== "id" &&
            !hasSpecialCharacters.test(property) && (
              <div key={property} className="CommentDropDown_Grid">
                <>
                  <b>
                    <label key={property} style={{ float: "left" }}>
                      {" "}
                      {property.charAt(0).toUpperCase() +
                        property.slice(1)}{" "}
                    </label>
                  </b>

                  <div>
                    <select className="form-select" ref={selectRefs[index]}>
                      {comments
                        .filter((comment) => (comment as any)[property] !== "")
                        .map((comment) => (
                          <option key={comment.id}>
                            {(comment as any)[property].replace()}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <input
                      className="btn btn-primary"
                      type="button"
                      value="Add Comment"
                      onClick={() => {
                        var selectedValue: string = "";
                        selectedValue = (selectRefs[index].current?.value ?? "")
                          .toString()
                          .trim();

                        if (selectedSentencesIntoTextArea == "") {
                          setSelectedSentencesIntoTextArea(
                            selectedValue?.toString().trim()
                          );
                          console.log(selectedSentencesIntoTextArea);
                        } else {
                          setSelectedSentencesIntoTextArea((previousValue) =>
                            (
                              previousValue +
                              " " +
                              selectedValue.toString().trim()
                            ).replace(/[\[\](){}<p></p>]/g, "")
                          );
                          console.log(selectedSentencesIntoTextArea);
                        }
                      }}
                      ref={buttonRefs[index]}
                    />
                  </div>
                </>

                <br />
              </div>
            )
        )}
      </div>
    </form>
  );
};

export default CommentDropDown;
