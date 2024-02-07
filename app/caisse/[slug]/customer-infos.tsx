"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import {
    Control,
    Controller,
    FieldErrors,
    FormState,
    UseFormGetFieldState,
    UseFormTrigger,
} from "react-hook-form";
import { FormValues } from "./order-form";

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

        trigger("indicator");
        trigger("name");
        trigger("phone");
        trigger("address");

        console.log(errors);

        if (
            !errors.indicator &&
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
        <SectionCard>
            <SectionAccordion
                id="infos-client"
                title="Informations client"
                subtitleExpanded="Entrez vos informations de livraison">
                <div className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column gap-1">
                        <div className="row g-0">
                            <div className="col-2">
                                <Controller
                                    control={control}
                                    name="indicator"
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            {...field}
                                            isInvalid={fieldState.invalid}
                                            errorMessage={
                                                fieldState.invalid &&
                                                "Champ requis"
                                            }
                                        />
                                    )}
                                />
                            </div>
                            <div className="col">
                                <Controller
                                    control={control}
                                    name="phone"
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            placeholder="Numéro de téléphone"
                                            {...field}
                                            isInvalid={fieldState.invalid}
                                            errorMessage={
                                                fieldState.invalid &&
                                                "Entrez votre numéro de téléphone"
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <Input
                                    type="text"
                                    variant="underlined"
                                    placeholder="Entrez votre nom"
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
                                    variant="underlined"
                                    placeholder="Entrez votre adresse de livraison"
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
                    <div className="d-flex justify-content-end">
                        <Button
                            type="button"
                            color="primary"
                            radius="full"
                            onClick={handleCheckValidity}>
                            {"Enregistrer l'adresse"}
                        </Button>
                    </div>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
