import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideAlertModal } from '../../action/alertModal';

const AlertModal = ({ text, show, callback }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        if (callback && typeof callback === 'function') {
            callback();
        }
        dispatch(hideAlertModal());
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleClose();
                    }}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlertModal;