"use client";
import { Checkbox } from "@nextui-org/react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { FormValues } from "./order-form";
import { PaymentOptions } from "@/app/_shared/shared/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import Accordion from "@/app/_shared/components/commun/accordion";

export default function PaymentOption({
    control,
}: {
    control: Control<FormValues>;
}) {
    return (
        <Accordion
            defaultOpened
            title="Option de paiement"
            subtitle="Quel est votre moyen de paiement ?">
            <div>
                <Controller
                    control={control}
                    name="optionPaymentCash"
                    render={({ field }) => (
                        <Checkbox
                            radius="full"
                            color="primary"
                            className="w-full m-0 max-w-full items-start gap-3"
                            classNames={{
                                wrapper: `border-2 border-primary`,
                                label: "w-full"
                            }}
                            isSelected={field.value}
                            onChange={field.onChange}>
                            <div className="flex flex-row justify-between">
                                <span className="text-sm">
                                    Paiement à la livraison
                                </span>
                                <span>
                                    <FontAwesomeIcon
                                        icon={
                                            faMoneyBill1Wave
                                        }></FontAwesomeIcon>
                                </span>
                            </div>
                        </Checkbox>
                    )}
                />
            </div>
        </Accordion>
    );
}
