"use client";
import { Checkbox } from "@nextui-org/react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { FormValues } from "./order-form";
import { DeliveryOptions } from "@/app/_shared/shared/enums";

export default function DeliveryOption({
    control,
}: {
    control: Control<FormValues>;
}) {
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
                            <Controller
                                control={control}
                                name="optionDelivery"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Checkbox
                                        radius="none"
                                        color="primary"
                                        {...field}
                                        checked={
                                            field.value ===
                                            DeliveryOptions.EXPRESS
                                        }
                                        value={DeliveryOptions.EXPRESS}
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
