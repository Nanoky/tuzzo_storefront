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
                            <Controller
                                control={control}
                                name="optionPayment"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Checkbox
                                        radius="none"
                                        color="primary"
                                        {...field}
                                        checked={
                                            field.value === PaymentOptions.CASH
                                        }
                                        value={PaymentOptions.CASH}
                                        onChange={field.onChange}>
                                        <div className="d-flex flex-column gap-1">
                                            <span className="text-normal">
                                                Paiement par carte
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
