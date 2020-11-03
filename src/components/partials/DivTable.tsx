import React from "react";
import "./DivTable.scss";

const COMPONENT_NAME = "DivTable";

interface TableData {

}

interface DivTableProps {
    headings?: string[];
    tableData: any[];
    allowed: string[];
}

const DivTable = ({ headings, tableData, allowed }: DivTableProps) => {

    const formatData = () => {
        return tableData.map(row => {
            const rowData = [];

            for(const key in row) {
                if(allowed && allowed.indexOf(key) !== -1) {
                    rowData.push(row[key]);
                }
            }

            return rowData;
        })
    };

    console.log("tableData", formatData());

    return (
        <div className={COMPONENT_NAME}>
            {headings ? (
                <div className={`${COMPONENT_NAME}__row`}>
                    {headings.map((heading, i) => (
                        <div key={i} className={`${COMPONENT_NAME}__column ${COMPONENT_NAME}__heading`}>{heading}</div>
                    ))}
                </div>
            ): undefined}
            {formatData().map((row: any, i) => (
                <div key={i} className={`${COMPONENT_NAME}__row`}>
                    {row.map((column: any, idx: any) => (
                        <div key={idx} className={`${COMPONENT_NAME}__column ${COMPONENT_NAME}__heading`}>{column}</div>
                    ))}
                </div>
            ))}
        </div>
    )
};

export { DivTable };
