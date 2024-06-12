/**
 * @file Button Component
 */

import React from "react";
import styles from "./styles.module.scss";

const Button = (props) => {
  const { className, disabled, onClick, children, ...rest } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={styles.button}
      {...rest}
    >
      <div className="text">{children}</div>
    </button>
  );
};

/**
 * This component provides a way to render button components with various styling options.
 * @example
 * <Button variant={ButtonVariant.SECONDARY} rightIcon={<Icon />} >Click me</Button>
 */

export default Button;
