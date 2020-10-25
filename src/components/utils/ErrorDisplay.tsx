import React from "react";
import "./ErrorDisplay.scss";

const COMPONENT_NAME = "ErrorDisplay";

interface ErrorDisplayProps {
    errors?: string[];
    isVisible: boolean;
    onClose(): void;
}

const ErrorDisplay = ({ errors, isVisible, onClose }: ErrorDisplayProps) => {
    return (
        <div className={`${COMPONENT_NAME} ${isVisible ? "show" : ""}`}>
            <div className={`${COMPONENT_NAME}--inner`}>
                <h2>Uh oh, something went wrong!</h2>
                <p>Below is a list of errors:</p>
                {errors ? (
                    <ul>
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                ): undefined}

                <div
                    className={`${COMPONENT_NAME}--dismiss`}
                    onClick={() => onClose()}
                >
                    x
                </div>
            </div>
        </div>
    );
};

export { ErrorDisplay };
