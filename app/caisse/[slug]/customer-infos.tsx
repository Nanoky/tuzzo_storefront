"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";
import {
    Control,
    Controller,
    FormState,
    UseFormGetFieldState,
} from "react-hook-form";
import { FormValues } from "./order-form";

export default function CustomerInfos({
    control,
    getState,
}: {
    control: Control<FormValues>;
    getState: UseFormGetFieldState<FormValues>;
}) {
    const [isValid, setIsValid] = useState(false);
    const handleCheckValidity = () => {
        if (
            !getState("name").invalid &&
            !getState("phone").invalid &&
            !getState("indicator").invalid &&
            !getState("address").invalid
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };
    return (
        <SectionCard>
            <SectionAccordion
                key="infos-client"
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
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col">
                                <Controller
                                    control={control}
                                    name="phone"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            placeholder="Numéro de téléphone"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    variant="underlined"
                                    placeholder="Entrez votre nom"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="address"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    variant="underlined"
                                    placeholder="Entrez votre adresse de livraison"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button type="button" color="primary" radius="full" onClick={handleCheckValidity}>
                            {"Enregistrer l'adresse"}
                        </Button>
                    </div>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
