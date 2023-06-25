import React, {useState, useEffect} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {useDispatch, useSelector} from 'react-redux';
import {setComponentPropObject} from '../../../reducers/formObjectReducer';

function InputValidation({component_id, currSectionId}) {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const dispatch = useDispatch();

    const [validationType, setValidationType] = useState('Email');
    const [comparisonType, setComparisonType] = useState('');
    const [component_prop_object, setComponent_prop_object] = useState({});

    const validationTypes = ['Number', 'Email', 'Contains', 'Length', 'Regular Expression'];
    const comparisonTypes = {
        Number: ['Greater than', 'Less than', 'Equal to'],
        Email: ['Valid email'],
        Contains: ['Substring'],
        Length: ['Greater than', 'Less than', 'Equal to'],
        'Regular Expression': ['Custom pattern'],
    };

    const handleChangeValidationType = (event) => {
        const selectedType = event.target.value;
        const capitalizedType = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

        setValidationType(capitalizedType);
        setComparisonType('');
        setComponent_prop_object({
            ...component_prop_object,
            validation: {
                type: selectedType,
                comparison: '',
            },
        });
        dispatch(
            setComponentPropObject({
                component_id: component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component_prop_object,
                    validation: {
                        type: selectedType,
                        comparison: '',
                    },
                },
            })
        );
    };

    const handleChangeComparisonType = (event) => {
        const selectedType = event.target.value;
        setComparisonType(selectedType);
        setComponent_prop_object({
            ...component_prop_object,
            validation: {
                ...component_prop_object.validation,
                comparison: selectedType,
            },
        });
        dispatch(
            setComponentPropObject({
                component_id: component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component_prop_object,
                    validation: {
                        ...component_prop_object.validation,
                        comparison: selectedType,
                    },
                },
            })
        );
    };

    const handleChangeAnswerLimit = (event) => {
        const answerLimit = event.target.value;
        setComponent_prop_object({
            ...component_prop_object,
            validation: {
                ...component_prop_object.validation,
                answer_limit: answerLimit,
            },
        });
        dispatch(
            setComponentPropObject({
                component_id: component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component_prop_object,
                    validation: {
                        ...component_prop_object.validation,
                        answer_limit: answerLimit,
                    },
                },
            })
        );
    };


    useEffect(() => {
        const currComponent = formSectionsArray
            .find((section) => section.section_id === currSectionId)
            .section_components.find((component) => component.component_id === component_id);
        setComponent_prop_object(currComponent.component_prop_object);
        setValidationType(currComponent.component_prop_object.validation?.type || 'Email');
        setComparisonType(currComponent.component_prop_object.validation?.comparison || '');
    }, [formSectionsArray, currSectionId, component_id]);

    return (
        <div className="form validation">


            <div className="form ">
                <select
                    className="dropdown-select"
                    value={validationType}
                    onChange={handleChangeValidationType}
                >
                    <option value="">Select a validation type</option>
                    {validationTypes.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="validation-conditions">
             
                {validationType && validationTypes && validationType !== "Email" ? (
                        <div className="form comparison">
                            <select
                                className="dropdown-select"
                                value={comparisonType}
                                onChange={handleChangeComparisonType}
                            >
                                <option value="" className='dropdown-option'>Select a comparison</option>
                                {comparisonTypes[validationType].map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) :
                    null}
                <div className="answer-limit">
                    {
                        comparisonType && comparisonTypes &&
                        validationType !== "Email" ?
                            <TextareaAutosize
                                className="input"
                                placeholder={comparisonType}
                                value={component_prop_object.validation?.answer_limit || ''}
                                onChange={handleChangeAnswerLimit}
                            />
                            :
                            null

                    }
                </div>
                <span className="input-border"></span>
            </div>

        </div>
    );
}

export default InputValidation;
