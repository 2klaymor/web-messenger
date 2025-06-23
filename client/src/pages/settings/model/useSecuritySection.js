import {useState, useRef} from "react";
import {patchPassword} from "../../../features/update-password/api-update-password";
import {deleteAccount} from "../../../features/delete-account/api-delete-account";

export const useSecuritySection = () => {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const [errorKey, setErrorKey] = useState('');
    const [success, setSuccess] = useState(false);

    const handleUpdatePassword = async () => {
        setErrorKey('');
        setSuccess(false);
        if (newPasswordRef.current?.value.length < 8) {
            setErrorKey('password_too_short');
            return;
        }

        try {
            const oldPassword = oldPasswordRef.current?.value;
            const newPassword = newPasswordRef.current?.value;

            const updated = await patchPassword(oldPassword, newPassword);
            if (updated === false) {
                setErrorKey('wrong_password')
            } else {
                setSuccess(true);
                setErrorKey('success');
            }

        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteAccount = async () => {
        const confirm = window.confirm('are you sure you want to delete your account?');
        if (!confirm) return;

        try {
            await deleteAccount();
            localStorage.removeItem('accessToken');
            window.location.href = "/signin";
        } catch (e) {
            console.error("error deleting account", e);
        }
    };

    const handleClosePasswordForm = () => {
        setErrorKey('');
        setShowPasswordForm(false);
    };

    return {
        showPasswordForm, setShowPasswordForm,
        oldPasswordRef, newPasswordRef,
        handleUpdatePassword, handleDeleteAccount,
        handleClosePasswordForm, errorKey, success, setErrorKey,
    };
};