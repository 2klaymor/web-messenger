import {useState} from 'react';

const useDropdownState = (initialState) => {
    const [dropdownStates, setDropdownStates] = useState(initialState);

    const openDropdown = (name) => {
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

    return {dropdownStates, openDropdown, closeDropdown}
}

export default useDropdownState;