"use client";
import { Checkbox } from "@nextui-org/react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import { useState } from "react";
import { Control, Controller, useController } from "react-hook-form";
import { FormValues } from "./order-form";
import { DeliveryOptions } from "@/app/_shared/shared/enums";

export default function DeliveryOption({
    control,
}: {
    control: Control<FormValues>;
}) {

    return (
        <SectionCard>
            <SectionAccordion
                id={"livraison"}
                title="Option de livraison"
                subtitleCollapsed="Choisissez votre option de livraison"
                subtitleExpanded="Comment voulez-vous être livré ?">
                <div>
                    <SectionCard>
                        <div className="flex flex-row justify-between items-center">
                            <Controller
                                control={control}
                                name="optionDeliveryExpress"
                                render={({ field }) => (
                                    <Checkbox
                                        radius="none"
                                        color="primary"
                                        name={field.name}
                                        isSelected={field.value}
                                        onChange={field.onChange}>
                                        <div className="d-flex flex-column gap-1">
                                            <span className="text-normal">
                                                Livraison express
                                            </span>
                                            <span className="text-xs">
                                                Livraison rapide selon votre
                                                adresse
                                            </span>
                                        </div>
                                    </Checkbox>
                                )}
                            />
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
