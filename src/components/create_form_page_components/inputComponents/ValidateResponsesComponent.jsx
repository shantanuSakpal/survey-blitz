import React, {useState, useEffect} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {useDispatch, useSelector} from 'react-redux';
import {setComponentPropObject} from '../../../reducers/formObjectReducer';

function InputValidation({component_id, currSectionId}) {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const dispatch = useDispatch();

    const [validationType, setValidationType] = useState('');
    const [comparisonType, setComparisonType] = useState('');
    const [component_prop_object, setComponent_prop_object] = useState({});

    const validationTypes = ['number', 'email', 'contains', 'length', 'regular expression'];
    const comparisonTypes = {
        number: ['greater than', 'less than', 'equal to'],
        email: ['valid email'],
        contains: ['substring'],
        length: ['greater than', 'less than', 'equal to'],
        'regular expression': ['custom pattern'],
    };

    const handleChangeValidationType = (event) => {
        const selectedType = event.target.value;
        setValidationType(selectedType);
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

    useEffect(() => {
        const currComponent = formSectionsArray
            .find((section) => section.section_id === currSectionId)
            .section_components.find((component) => component.component_id === component_id);
        setComponent_prop_object(currComponent.component_prop_object);
        setValidationType(currComponent.component_prop_object.validation?.type || '');
        setComparisonType(currComponent.component_prop_object.validation?.comparison || '');
    }, [formSectionsArray, currSectionId, component_id]);

    return (
        <div className="form validation">


            <div className="form question">
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
                <span className="input-border"></span>
            </div>
            {/*<div>*/}
            {/*    {validationType && (*/}
            {/*        <div className="form comparison">*/}
            {/*            <select*/}
            {/*                className="dropdown-select"*/}
            {/*                value={comparisonType}*/}
            {/*                onChange={handleChangeComparisonType}*/}
            {/*            >*/}
            {/*                <option value="" className='dropdown-option'>Select a comparison</option>*/}
            {/*                {comparisonTypes[validationType].map((option, index) => (*/}
            {/*                    <option key={index} value={option}>*/}
            {/*                        {option}*/}
            {/*                    </option>*/}
            {/*                ))}*/}
            {/*            </select>*/}
            {/*            <span className="input-border"></span>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    <TextareaAutosize*/}
            {/*        className="input"*/}
            {/*        placeholder="Custom error message"*/}
            {/*        value={component_prop_object.validation?.custom_error_message || ''}*/}
            {/*        onChange={(event) => {*/}
            {/*            setComponent_prop_object({*/}
            {/*                ...component_prop_object,*/}
            {/*                validation: {*/}
            {/*                    ...component_prop_object.validation,*/}
            {/*                    custom_error_message: event.target.value,*/}
            {/*                },*/}
            {/*            });*/}
            {/*            dispatch(*/}
            {/*                setComponentPropObject({*/}
            {/*                    component_id: component_id,*/}
            {/*                    section_id: currSectionId,*/}
            {/*                    component_prop_object: {*/}
            {/*                        ...component_prop_object,*/}
            {/*                        validation: {*/}
            {/*                            ...component_prop_object.validation,*/}
            {/*                            custom_error_message: event.target.value,*/}
            {/*                        },*/}
            {/*                    },*/}
            {/*                })*/}
            {/*            );*/}
            {/*            */}
            {/*            */}
            {/*        }*/}
            {/*        }*/}
            {/*    />*/}
            {/*    <span className="input-border"></span>*/}
            {/*</div>*/}

        </div>
    );
}

export default InputValidation;
