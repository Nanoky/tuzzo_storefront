"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import {
    Control,
    Controller,
    FieldErrors,
    UseFormGetValues,
    UseFormSetValue,
    UseFormTrigger,
} from "react-hook-form";
import { FormValues } from "./order-form";
import Accordion from "@/app/_shared/components/commun/accordion";
import { OrderCustomer } from "@/business/models/order";
import { searchCustomers } from "@/app/_shared/services/order";
import { Store } from "@/business/models/store";
import Loader from "@/app/_shared/components/commun/Loader";
import { CUSTOMER_DEFAULT_PHONE_INPUT_VALUE } from "@/app/_shared/shared/data";
import { PHONE_NUMBER_PATTERN } from "@/app/_shared/shared/regex";

export default function CustomerInfos({
    control,
    errors,
    trigger,
    store,
    getValues,
    setValue,
}: {
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
    trigger: UseFormTrigger<FormValues>;
    store: Store;
    getValues: UseFormGetValues<FormValues>;
    setValue: UseFormSetValue<FormValues>;
}) {
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCheckValidity = () => {
        trigger("name");
        trigger("phone");
        trigger("address");

        console.log(errors);

        const nameError = !getValues("name") || errors.name;
        const phoneError =
            getValues("phone").match(PHONE_NUMBER_PATTERN) === null ||
            errors.phone;
        const addressError = !getValues("address") || errors.address;

        if (!nameError && !phoneError && !addressError) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const search = () => {
        const pattern = getValues("phone");

        if (pattern === CUSTOMER_DEFAULT_PHONE_INPUT_VALUE) {
            return;
        }

        if (pattern.match(PHONE_NUMBER_PATTERN) === null) {
            setValue("name", "");
            setValue("address", "");
            return;
        }

        setLoading(true);

        searchCustomers({ phone: pattern, store })
            .then((customer) => {
                if (customer) {
                    setValue("name", customer.fullname);
                    setValue("address", customer.address);

                    trigger("name");
                    trigger("address");
                } else {
                    setValue("name", "");
                    setValue("address", "");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };
    return (
        <Accordion
            defaultOpened
            title="Entrez vos informations"
            subtitle="Vos informations de livraison"
            checked={isValid}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Controller
                        control={control}
                        name="phone"
                        rules={{
                            required: true,
                            pattern: PHONE_NUMBER_PATTERN,
                        }}
                        render={({ field, fieldState }) => (
                            <Input
                                type="text"
                                variant="bordered"
                                radius="sm"
                                label="Numéro de téléphone"
                                {...field}
                                onBlur={() => {
                                    search();
                                    field.onBlur();
                                }}
                                isInvalid={fieldState.invalid}
                                errorMessage={
                                    fieldState.invalid &&
                                    "Entrez un numéro de téléphone valide"
                                }
                            />
                        )}
                    />
                    {loading ? (
                        <div className="h-30 w-full">
                            <Loader />
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
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
