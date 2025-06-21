import {useEffect, useState} from "react";

export default function useHeaderUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(e) {
            // если клик был не по контейнеру, закрываем
            if (!e.target.closest('.header-user__dropdown')) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return {isMenuOpen, setIsMenuOpen, isProfileModalOpen, setIsProfileModalOpen};
}