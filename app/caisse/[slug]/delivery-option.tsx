"use client";
import { Card, CardBody, Checkbox } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";
import { FormValues } from "./order-form";
import { DeliveryOptions } from "@/app/_shared/shared/enums";
import Accordion from "@/app/_shared/components/commun/accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function DeliveryOption({
    control,
}: {
    control: Control<FormValues>;
}) {
    return (
        <Accordion
            title="Options de livraison"
            subtitle="Comment voulez vous être livré ?"
            defaultOpened>
            <div>
                <Card className="rounded-2xl">
                    <CardBody className="p-0 h-fit">
                        <div className="">
                            <Controller
                                control={control}
                                name="optionDeliveryExpress"
                                render={({ field }) => (
                                    <Checkbox
                                        radius="full"
                                        color={field.value ? "default" : "primary"}
                                        className="w-full p-4 m-0 max-w-full items-start gap-3 data-[selected=true]:bg-primary"
                                        classNames={{
                                            label: `${field.value ? "text-tertiary" : ""}`,
                                            wrapper: `border-2 ${field.value ? "border-tertiary" : " border-primary"}`,
                                        }}
                                        name={field.name}
                                        isSelected={field.value}
                                        onChange={field.onChange}>
                                        <div className="flex flex-col gap-2 ">
                                            <div className="flex flex-col">
                                                <span className="text-normal font-semibold">
                                                    Livraison express
                                                </span>
                                                <span className="text-xs">
                                                    Livraison rapide selon votre
                                                    adresse
                                                </span>
                                            </div>
                                            <span className="text-sm">
                                                A vos frais
                                            </span>
                                        </div>
                                    </Checkbox>
                                )}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Accordion>
    );
}
