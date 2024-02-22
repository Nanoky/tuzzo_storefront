"use client";
import { useCart } from "@/app/_shared/hooks/cart";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";
import { FormValues } from "./order-form";
import React from "react";
import Accordion from "@/app/_shared/components/commun/accordion";

export default function CheckoutSummary({
    control,
    isButtonLoading,
}: {
    control: Control<FormValues>;
    isButtonLoading: boolean;
}) {
    const submitRef = React.useRef<HTMLButtonElement>(null);
    const { total } = useCart();

    const handleSubmit = () => {
        submitRef.current?.click();
    };
    return (
        <Accordion
            title="Résumé"
            subtitle="Voici le résumé de votre commande"
            defaultOpened>
            <div className="flex flex-col gap-4">
                <Divider></Divider>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="text-sm">Sous-total</span>
                        <span className="text-normal">{total}F</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm">Total</span>
                        <span className="text-xl text-bold">{total}F</span>
                    </div>
                </div>
                <div className="">
                    <Controller
                        control={control}
                        name="comment"
                        render={({ field }) => (
                            <Textarea
                                type="text"
                                variant="bordered"
                                label="Commantaires"
                                {...field}
                            />
                        )}
                    />
                </div>
                <div className="flex justify-center">
                    <Button
                        color="primary"
                        radius="full"
                        type="submit"
                        className="px-6"
                        onClick={handleSubmit}
                        isLoading={isButtonLoading}>
                        Valider
                    </Button>
                </div>
            </div>
        </Accordion>
    );
}
