/**
 * @file Modal Component
 */

import React, { useRef, memo } from "react";
import cx from "classnames";

import useClickOutside from "../../hooks/useClickoutSide";

import Cross from "../../assets/svg/crooss.svg";

import styles from "./styles.module.scss";

const Modal = (props) => {
  const {
    isModalOpen,
    closeModal,
    className,
    iconPosition,
    children,
    shouldHandleOutsideClick,
    isCentered,
    darkBackground,
  } = props;

  const modalContainerRef = useRef(null);

  const handleClickOutside = () => {
    if (isModalOpen && shouldHandleOutsideClick) {
      closeModal();
    }
  };

  useClickOutside(modalContainerRef, handleClickOutside);

  return isModalOpen ? (
    <div data-active={darkBackground} className={styles.modalWrapper}>
      <div
        className={cx(
          styles.modalContainer,
          isCentered ? styles.centered : className
        )}
        ref={modalContainerRef}
      >
        <img
          className={cx(styles.cross, iconPosition)}
          onClick={closeModal}
          alt="Cross"
          src={Cross}
        />

        {children}
      </div>
    </div>
  ) : null;
};

/**
 * This component provides a way to render Modal components with various styling options.
 * @example
 *    <Modal
 *      isModalOpen={isModalOpen}
 *      closeModal={closeModal}
 *      setIsModalOpen={setIsModalOpen}
        shouldHandleOutsideClick={false}
        darkBackground
        isCentered
 *    >
 *      {content of my modal}
 *    </Modal>
 */

export default memo(Modal);
