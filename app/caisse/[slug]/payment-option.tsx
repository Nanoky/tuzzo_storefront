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

export default function PaymentOption() {
    return (
        <SectionCard>
            <SectionAccordion
                key="paiement"
                title="Option de paiement"
                subtitleCollapsed="Choisissez votre option de paiement"
                subtitleExpanded="Comment voulez-vous payer ?">
                <div>
                    <Card>
                        <CardBody>
                            <div className="d-flex flex-row justify-content-between">
                                <Checkbox defaultChecked>
                                    <div className="d-flex flex-column gap-1">
                                        <span className="text-normal">
                                            Paiement par carte
                                        </span>
                                        <span className="text-sm">
                                            Livraison rapide selon votre adresse
                                        </span>
                                    </div>
                                </Checkbox>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
