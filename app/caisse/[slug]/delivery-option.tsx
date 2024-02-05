"use client";
import { Checkbox } from "@nextui-org/react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";

export default function DeliveryOption() {
    
    return (
        <SectionCard>
            <SectionAccordion
                key={"livraison"}
                title="Option de livraison"
                subtitleCollapsed="Choisissez votre option de livraison"
                subtitleExpanded="Comment voulez-vous être livré ?">
                <div>
                    <SectionCard>
                        <div className="d-flex flex-row justify-content-between">
                            <Checkbox defaultChecked>
                                <div className="d-flex flex-column gap-1">
                                    <span className="text-normal">
                                        Livraison express
                                    </span>
                                    <span className="text-sm">
                                        Livraison rapide selon votre adresse
                                    </span>
                                </div>
                            </Checkbox>
                            <span className="text-lg">Gratuit</span>
                        </div>
                    </SectionCard>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
