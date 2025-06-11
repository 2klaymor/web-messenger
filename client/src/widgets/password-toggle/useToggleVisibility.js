import {useState, useCallback} from "react";

export function useToggleVisibility(inputRef) {
    const [show, setShow] = useState(false);

    const toggle = useCallback(() => {
        const input = inputRef?.current;

        if (input) {
            const {selectionStart, selectionEnd} = input;
            setShow(prev => {
                const next = !prev;
                setTimeout(() => {
                    try {
                        input.setSelectionRange(selectionStart, selectionEnd);
                    } catch (e) {
                        // на некоторых устройствах не поддерживается setSelectionRange
                    }
                }, 0);
                return next;
            });
        } else {
            setShow(prev => !prev);
        }
    }, [inputRef]);

    return {show, toggle};
}