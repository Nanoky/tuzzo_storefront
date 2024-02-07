"use client";
import { Checkbox } from "@nextui-org/react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { FormValues } from "./order-form";
import { PaymentOptions } from "@/app/_shared/shared/enums";

export default function PaymentOption({
    control,
}: {
    control: Control<FormValues>;
}) {
    return (
        <SectionCard>
            <SectionAccordion
                id="paiement"
                title="Option de paiement"
                subtitleCollapsed="Choisissez votre option de paiement"
                subtitleExpanded="Comment voulez-vous payer ?">
                <div>
                    <SectionCard>
                        <div className="d-flex flex-row justify-content-between">
                            <Controller
                                control={control}
                                name="optionPaymentCash"
                                render={({ field }) => (
                                    <Checkbox
                                        radius="none"
                                        color="primary"
                                        isSelected={
                                            field.value
                                        } onChange={field.onChange}>
                                        <div className="d-flex flex-column gap-1">
                                            <span className="text-normal">
                                                Paiement à la livraison
                                            </span>
                                            <span className="text-xs">
                                                Payez en espèce lors de votre
                                                livraison
                                            </span>
                                        </div>
                                    </Checkbox>
                                )}
                            />
                        </div>
                    </SectionCard>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
