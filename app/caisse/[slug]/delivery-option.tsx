"use client";
import { Checkbox } from "@nextui-org/react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import { useState } from "react";

export default function DeliveryOption() {
    const [isExpress, setIsExpress] = useState(true);

    const handleChangeExpress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsExpress(event.target.checked);
    };

    return (
        <SectionCard>
            <SectionAccordion
                key={"livraison"}
                title="Option de livraison"
                subtitleCollapsed="Choisissez votre option de livraison"
                subtitleExpanded="Comment voulez-vous être livré ?">
                <div>
                    <SectionCard>
                        <div className="flex flex-row justify-between items-center">
                            <Checkbox
                                radius="none"
                                checked={isExpress}
                                onChange={handleChangeExpress} color="primary">
                                <div className="d-flex flex-column gap-1">
                                    <span className="text-normal">
                                        Livraison express
                                    </span>
                                    <span className="text-xs">
                                        Livraison rapide selon votre adresse
                                    </span>
                                </div>
                            </Checkbox>
                            <span className="text-lg font-semibold">
                                Gratuit
                            </span>
                        </div>
                    </SectionCard>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
