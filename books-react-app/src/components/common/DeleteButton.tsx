import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { RiDeleteBinLine, RiCloseLine, RiCheckLine } from 'react-icons/ri';

interface DeleteButtonProps {
    onConfirm: () => void;
    confirmDialog?: boolean;
    icon?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onConfirm, confirmDialog = false, icon = false }) => {
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
            <Button onClick={handleDelete}>
                {icon ? <RiDeleteBinLine /> : 'Delete'}
            </Button>
            {confirmDialog && (
                <Dialog open={openDialog} onClose={handleCancel}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to delete?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            {icon ? <RiCloseLine /> : 'Cancel'}
                        </Button>
                        <Button onClick={handleConfirm} color="secondary" autoFocus>
                            {icon ? <RiCheckLine /> : 'Confirm'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default DeleteButton;
