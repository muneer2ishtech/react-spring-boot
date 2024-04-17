import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { RiCheckLine, RiCloseLine, RiDeleteBinLine } from 'react-icons/ri';

interface DeleteButtonProps {
    onConfirm: () => void;
    confirmDialog?: boolean;
    icon?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onConfirm,
    confirmDialog = false,
    icon = false,
    className,
    style
}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = () => {
        if (confirmDialog) {
            setOpenDialog(true);
        } else {
            onConfirm();
        }
    };

    const handleConfirm = () => {
        setOpenDialog(false);
        onConfirm();
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Button onClick={handleDelete} className={className} style={style}>
                {icon ? <RiDeleteBinLine /> : 'Delete'}
            </Button>
            {confirmDialog && (
                <Dialog open={openDialog} onClose={handleCancel}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to delete?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} variant="contained" color="warning">
                            {icon ? <RiCloseLine /> : 'Cancel'}
                        </Button>
                        <Button onClick={handleConfirm} variant="contained" color="error" autoFocus>
                            {icon ? <RiCheckLine /> : 'Confirm'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default DeleteButton;
