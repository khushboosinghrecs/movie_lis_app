import React from "react";
import cx from "classnames";

import styles from "./styles.module.scss";

const Button = (props) => {
  const { className, disabled, onClick, children, ...rest } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={cx(styles.button, className)}
      {...rest}
    >
      <div className="text">{children}</div>
    </button>
  );
};

export default Button;

/**
*This component provides a way to render button component with various styling options 
*@example
<Button onClick={onClick}>click me </Button>
*/
