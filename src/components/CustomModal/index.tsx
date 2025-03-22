import React from 'react';
import { Modal } from 'react-bootstrap';
import { CloseIconSVG } from '../../assets/svg';
import './CustomModal.scss';

interface ICustomModal {
  show: boolean;
  onHide?: () => void;
  title?: string | JSX.Element;
  children: JSX.Element;
  close?: boolean;
  className?: string;
  size?: 'sm' | 'lg' | 'xl';
  backdrop?: 'static' | true;
  backdropClassName?: string;
  dialogClassName?: string;
}

const CustomModal: React.FC<ICustomModal> = ({
    size,
    show,
    close,
    onHide,
    title,
    children,
    className,
    backdrop,
    dialogClassName,
    backdropClassName,
  }) => {
  return (
    <Modal
      size={size}
      show={show}
      onHide={onHide}
      centered
      className={`generic-modal ${className}`}
      backdrop={backdrop}
      style={{ display: 'flex'}}
      dialogClassName={dialogClassName}
      backdropClassName={backdropClassName}
    >
      <Modal.Header className="d-flex w-100 px-4 py-4 justify-content-between">
        <Modal.Title>{title}</Modal.Title>
        {close && <div onClick={onHide} className="pointer"><CloseIconSVG /></div>}
      </Modal.Header>
      <Modal.Body className="px-4">{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
