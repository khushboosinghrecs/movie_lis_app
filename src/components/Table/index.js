/**
 * @file Table Component
 */
import React from "react";
import cx from "classnames";

import styles from "./styles.module.scss";

export const Table = (props) => {
  const {
    data,
    columns,
    tableClassName,
    tableDataClassName,
    tableBodyClassName,
    headerCellClassName,
    tableHeaderClassName,
  } = props;

  return (
    <div className={styles.tableContainer}>
      <table
        cellPadding="0"
        cellSpacing="0"
        className={cx(tableClassName, styles.tableWrapper)}
      >
        <thead>
          <tr className={cx(tableHeaderClassName, styles.tableHead)}>
            {columns?.map((column) => (
              <td
                key={column?.accessor}
                className={cx(headerCellClassName, styles.headerCell)}
              >
                {column?.header}
              </td>
            ))}
          </tr>
        </thead>

        <div className={styles.tableBodyWrapper}>
          <tbody className={tableBodyClassName}>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tableBody}>
                {columns?.map((column) => (
                  <td
                    key={column?.accessor}
                    className={cx(tableDataClassName, styles.columnData)}
                  >
                    {row[column?.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  );
};
