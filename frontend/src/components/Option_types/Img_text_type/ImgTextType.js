


import React, { useState, useEffect } from "react";
import "./ImgTextType.css";
import deleteIcon from "../../../assets/Icons/deleteIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { selectedOption } from "../../../action/index";

export default function ImgTextType({
  quizType,
  type,
  handleImgTextoptionsChanger,
}) {
  const [radio, setRadio] = useState(quizType);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inputFields, setInputFields] = useState([
    { text: "", img: "", radio: false, type: type },
    { text: "", img: "", radio: false, type: type },
  ]);

  const questionGotAdded = useSelector((state) => state.emptyIt);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questionGotAdded) {
      setInputFields([
        { text: "", img: "", radio: false, type: type },
        { text: "", img: "", radio: false, type: type },
      ]);
      setSelectedIndex(null);  // Reset the selected index as well
    }
  }, [questionGotAdded, type]);

  const toggleRadio = () => {
    setRadio(!radio);
    setSelectedIndex(null);
  };

  useEffect(() => {
    handleImgTextoptionsChanger(inputFields);
  }, [inputFields, handleImgTextoptionsChanger]);

  const addInputField = () => {
    if (inputFields.length < 4) {
      setInputFields([
        ...inputFields,
        { text: "", img: "", radio: false, type: type },
      ]);
    }
  };

  const removeInputField = () => {
    if (inputFields.length > 2) {
      setInputFields(inputFields.slice(0, -1));
    }
  };

  const handleRadioChange = (index) => {
    const updatedFields = inputFields.map((field, i) => ({
      ...field,
      radio: i === index,
    }));
    setInputFields(updatedFields);
    setSelectedIndex(index);
    dispatch(selectedOption(index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index][field] = value;
    setInputFields(updatedFields);
  };

  return (
    <>
      <div id="optionsInput" className="img_text_type_container">
        {inputFields.map((item, index) => (
          <div key={index} className="img_text_type_input_filed">
            {radio && (
              <input
                type="radio"
                name="option"
                checked={item.radio}
                onChange={() => handleRadioChange(index)}
              />
            )}

            {type === "text" ? (
              <input
                className={`img_text_type_input ${
                  selectedIndex === index ? "selected" : ""
                }`}
                type="text"
                placeholder="Text"
                value={item.text}
                onChange={(e) =>
                  handleInputChange(index, "text", e.target.value)
                }
                style={{ minWidth: type !== "imgtext" ? "300px" : "" }}
              />
            ) : null}

            {type === "img" ? (
              <input
                className={`img_text_type_input ${
                  selectedIndex === index ? "selected" : ""
                }`}
                type="text"
                placeholder="Image URL"
                value={item.img}
                onChange={(e) =>
                  handleInputChange(index, "img", e.target.value)
                }
                style={{ minWidth: type !== "imgtext" ? "300px" : "" }}
              />
            ) : null}

            {type === "imgtext" ? (
              <>
                <input
                  className={`img_text_type_input ${
                    selectedIndex === index ? "selected" : ""
                  }`}
                  type="text"
                  placeholder="Text"
                  value={item.text}
                  onChange={(e) =>
                    handleInputChange(index, "text", e.target.value)
                  }
                />
                <input
                  className={`img_text_type_input ${
                    selectedIndex === index ? "selected" : ""
                  }`}
                  type="url"
                  placeholder="Image URL"
                  value={item.img}
                  onChange={(e) =>
                    handleInputChange(index, "img", e.target.value)
                  }
                />
              </>
            ) : null}

            {inputFields.length - 1 === index && index > 1 && (
              <span style={{ marginLeft: "20px", marginTop: "3px" }}>
                <img
                  onClick={removeInputField}
                  src={deleteIcon}
                  alt="Delete"
                  style={{ cursor: "pointer" }}
                />
              </span>
            )}
          </div>
        ))}
        {inputFields.length < 4 && (
          <button
            className="img_text_type_add_btn"
            style={{ marginLeft: radio ? "35px" : "" }}
            onClick={addInputField}
          >
            Add Options
          </button>
        )}
      </div>
    </>
  );
}
