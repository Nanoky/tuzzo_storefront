"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import {
    Control,
    Controller,
    FieldErrors,
    UseFormTrigger,
} from "react-hook-form";
import { FormValues } from "./order-form";
import Accordion from "@/app/_shared/components/commun/accordion";

export default function CustomerInfos({
    control,
    errors,
    trigger,
}: {
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
    trigger: UseFormTrigger<FormValues>;
}) {
    const [isValid, setIsValid] = useState(false);
    const handleCheckValidity = () => {
        trigger("name");
        trigger("phone");
        trigger("address");

        console.log(errors);

        if (
            !errors.name &&
            !errors.phone &&
            !errors.address
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };
    return (
        <Accordion
            defaultOpened
            title="Entrez vos informations"
            subtitle="Vos informations de livraison">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Controller
                        control={control}
                        name="phone"
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <Input
                                type="text"
                                variant="bordered"
                                radius="sm"
                                label="Numéro de téléphone"
                                {...field}
                                isInvalid={fieldState.invalid}
                                errorMessage={
                                    fieldState.invalid &&
                                    "Entrez votre numéro de téléphone"
                                }
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <Input
                                type="text"
                                variant="bordered"
                                radius="sm"
                                label="Entrez votre nom"
                                {...field}
                                isInvalid={fieldState.invalid}
                                errorMessage={
                                    fieldState.invalid &&
                                    "Entrez votre nom s'il vous plait"
                                }
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="address"
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <Input
                                type="text"
                                variant="bordered"
                                radius="sm"
                                label="Entrez votre adresse de livraison"
                                {...field}
                                isInvalid={fieldState.invalid}
                                errorMessage={
                                    fieldState.invalid &&
                                    "Entrez votre adresse s'il vous plait"
                                }
                            />
                        )}
                    />
                </div>
                <div className="flex justify-center">
                    <Button
                        type="button"
                        color="primary"
                        radius="full"
                        className="p-6"
                        onClick={handleCheckValidity}>
                        {"Enregistrer l'adresse"}
                    </Button>
                </div>
            </div>
        </Accordion>
    );
}
