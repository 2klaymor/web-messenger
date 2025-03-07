import {useState} from 'react';


// updates states
const useCustomState = (initialState) => {
    const [dropdownStates, setDropdownStates] = useState(initialState);

    const handleFocus = (name) => {
        // setDropdownStates: updates dropdown states
        // takes an arrow function as an argument
        // which takes the previous dropdown states, creates a new object
        // and returns it with updated states
        setDropdownStates((prevStates) => ({
            ...prevStates,
            [name]: true
        }));
    };

    const handleBlur = (name) => {
        setDropdownStates((prevStates) => ({
            ...prevStates,
            [name]: false
        }));
    };

    return {dropdownStates,
        handleFocus: (name) => handleFocus(name),
        handleBlur: (name) => handleBlur(name)}
};

export default useCustomState;