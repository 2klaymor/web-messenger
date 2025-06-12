import {useEffect, useState} from "react";

export default function useHeaderUser() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(e) {
            // если клик был не по контейнеру, закрываем
            if (!e.target.closest('.header-user__dropdown')) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return {isOpen, setIsOpen};
}