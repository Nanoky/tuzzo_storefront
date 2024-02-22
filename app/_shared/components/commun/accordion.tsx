'use client';

import {
    faCheck,
    faChevronDown,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";

function AccordionHeader({
    open,
    title,
    subtitle,
    checked,
    onClick,
}: {
    open: boolean;
    title: string;
    subtitle: string;
    checked: boolean;
    onClick: () => void;
}) {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <span className="font-bold text-lg">{title}</span>
                <span className="text-xs text-gray-500">{subtitle}</span>
            </div>
            <div>
                {checked && (
                    <Button className="bg-secondary/80 text-primary" isIconOnly>
                        {<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>}
                    </Button>
                )}
                <Button
                    className="bg-transparent text-primary"
                    isIconOnly
                    onClick={onClick}>
                    {open ? (
                        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                    ) : (
                        <FontAwesomeIcon
                            icon={faChevronRight}></FontAwesomeIcon>
                    )}
                </Button>
            </div>
        </div>
    );
}

export default function Accordion({
    children,
    checked = false,
    title,
    subtitle,
    defaultOpened = true,
}: {
    defaultOpened?: boolean;
    title: string;
    subtitle: string;
    checked?: boolean;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpened);

    useEffect(() => {
        if (checked) {
            handleClose();
        }
    }, [checked]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Card>
            <CardBody className="p-4">
                <div className="bg-tertiary">
                    <AccordionHeader
                        open={open}
                        title={title}
                        subtitle={subtitle}
                        checked={checked}
                        onClick={open ? handleClose : handleOpen}
                    />
                    {open && <div className="pt-4">{children}</div>}
                </div>
            </CardBody>
        </Card>
    );
}
