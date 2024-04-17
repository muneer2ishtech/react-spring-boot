import { Alert, AlertProps } from '@mui/material';
import React from 'react';

export interface AlertMessageProps {
    severity?: 'success' | 'error' | 'warning' | 'info';
    message?: string;
    onClose?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps & AlertProps> = ({ severity = 'info', message, onClose, ...alertProps }) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <>
            {message && (
                <Alert severity={severity} onClose={handleClose} {...alertProps}>
                    {message}
                </Alert>
            )}
        </>
    );
};

export default AlertMessage;
