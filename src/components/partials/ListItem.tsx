import React from "react";
import "./ListItem.scss";

const COMPONENT_NAME = "ListItem";

interface ListItemProps {
    description: string;
    onRemove?(): void;
}

const ListItem = ({ description, onRemove }: ListItemProps) => (
    <li>
        {description}

        {onRemove ? (
            <span
                className={`${COMPONENT_NAME}--remove`}
                onClick={() => onRemove && onRemove()}
            >
                x
            </span>
        ): undefined}
    </li>
);

export { ListItem };
