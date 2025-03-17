import {useState} from 'react';


const useDropdownState = (initialState) => {
    const [dropdownStates, setDropdownStates] = useState(initialState);

    const openDropdown = (name) => {
        // setDropdownStates: updates dropdown states
        // takes an arrow function as an argument
        // which takes the previous dropdown states, creates a new object
        // and returns it with updated states
        setDropdownStates((prevStates) => ({
            ...prevStates,
            [name]: true
        }));
    };

    const closeDropdown = (name) => {
        setDropdownStates((prevStates) => ({
            ...prevStates,
            [name]: false
        }));
    };

    return { dropdownStates, openDropdown, closeDropdown}

    // return {dropdownStates,
    //     handleFocus: (name) => openDropdown(name),
    //     handleBlur: (name) => closeDropdown(name)}
};

export default useDropdownState;