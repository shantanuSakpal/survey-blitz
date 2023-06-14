import React, { useState, useRef, useEffect } from "react";
import { DeleteButton } from "../../buttons/DeleteButton";
import { useDispatch } from "react-redux";
import {
  duplicateSectionComponent,
  removeSectionComponent,
  updateComponentIsRequired,
} from "../../../reducers/formObjectReducer";
import { DuplicateComponent } from "../../buttons/DuplicateComponent";
import IsRequiredToggle from "../../buttons/IsRequiredToggle";
import { useSelector } from "react-redux";
import { MoreOptionsButton } from "../../buttons/MoreOptionsButton";
import { TextInputMoreOptions } from "./more_options/TextInputMoreOptions";

export const InputOptions = ({
  component_id,
  currSectionId,
  component_type,
}) => {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  // Find the component in the formSectionsArray
  const currComponent = formSectionsArray
    .find((section) => section.section_id === currSectionId)
    .section_components.find(
      (component) => component.component_id === component_id
    );

  const dispatch = useDispatch();
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const moreOptionsRef = useRef(null);

  const handleIsRequiredToggleMouseDown = () => {
    setIsToggleClicked(true);
  };

  const handleIsRequiredToggleClick = () => {
    if (isToggleClicked) {
      setIsToggleClicked(false);

      dispatch(
        updateComponentIsRequired({
          component_id: component_id,
          section_id: currSectionId,
        })
      );
    }
  };

  const handleOutsideClick = (event) => {
    if (
      moreOptionsRef.current &&
      !moreOptionsRef.current.contains(event.target)
    ) {
      setIsMoreOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="input-options-container">
      <div
        className="delete-input-button"
        onClick={() => {
          dispatch(
            removeSectionComponent({
              component_id: component_id,
              section_id: currSectionId,
            })
          );
        }}
      >
        <DeleteButton />
      </div>
      <div
        className="duplicate-component-button"
        onClick={() => {
          const newComponent = {
            ...currComponent,
            component_id: Date.now(),
          };
          dispatch(
            duplicateSectionComponent({
              component_id: component_id,
              section_id: currSectionId,
              newComponent: newComponent,
            })
          );
        }}
      >
        <DuplicateComponent />
      </div>
      <div
        className="isrequired-toggle-button"
        onMouseDown={handleIsRequiredToggleMouseDown}
        onClick={handleIsRequiredToggleClick}
      >
        <IsRequiredToggle
          component_id={component_id}
          currSectionId={currSectionId}
        />
      </div>

      <div
        className="more-options-button"
        ref={moreOptionsRef}
        onClick={() => {
          setIsMoreOptionsOpen(!isMoreOptionsOpen);
        }}
      >
        {isMoreOptionsOpen && (
          <div className="more-options-content">
            {component_type === "short_text" ||
            component_type === "long_text" ? (
              <TextInputMoreOptions
                component_id={component_id}
                currSectionId={currSectionId}
              />
            ) : (
              <div>some other more options</div>
            )}
          </div>
        )}
        <MoreOptionsButton />
      </div>
    </div>
  );
};
