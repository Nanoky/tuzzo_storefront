"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Checkbox,
} from "@nextui-org/react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import { useState } from "react";

export default function PaymentOption() {
    const [isExpress, setIsExpress] = useState(true);

    const handleChangeExpress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsExpress(event.target.checked);
    };
    return (
        <SectionCard>
            <SectionAccordion
                key="paiement"
                title="Option de paiement"
                subtitleCollapsed="Choisissez votre option de paiement"
                subtitleExpanded="Comment voulez-vous payer ?">
                <div>
                    <SectionCard>
                        <div className="d-flex flex-row justify-content-between">
                            <Checkbox checked={isExpress} onChange={handleChangeExpress} radius="none" color="primary">
                                <div className="d-flex flex-column gap-1">
                                    <span className="text-normal">
                                        Paiement par carte
                                    </span>
                                    <span className="text-xs">
                                        Payez en espèce lors de votre livraison
                                    </span>
                                </div>
                            </Checkbox>
                        </div>
                    </SectionCard>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
