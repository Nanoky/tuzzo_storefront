"use client";

import { Card, CardBody } from "@nextui-org/react";
import CheckoutSummary from "./checkout-summary";
import CustomerInfos from "./customer-infos";
import DeliveryOption from "./delivery-option";
import PaymentOption from "./payment-option";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCart } from "@/app/_shared/hooks/cart";
import { saveOrder } from "@/app/_shared/services/order";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSuccessRoute } from "@/app/_shared/services/router";

type Options<TKey> = Map<TKey, boolean>;
export type FormValues = {
    name: string;
    phone: string;
    indicator: string;
    address: string;
    optionDeliveryExpress: boolean; //Options<DeliveryOptions>;
    optionPaymentCash: boolean; //Options<PaymentOptions>;
    comment: string;
};

const defaultFormValues: FormValues = {
    name: "",
    phone: "",
    indicator: "+225",
    address: "",
    optionDeliveryExpress: true /* new Map<DeliveryOptions, boolean>([
        [DeliveryOptions.EXPRESS, true],
    ]), */,
    optionPaymentCash: true /* new Map<PaymentOptions, boolean>([
        [PaymentOptions.CASH, true],
    ]), */,
    comment: "",
};

export default function OrderForm({
    storeSlug,
    storeId,
}: {
    storeSlug: string;
    storeId: string;
}) {
    const {
        handleSubmit,
        control,
        reset,
        getFieldState,
        formState: { errors },
        trigger,
    } = useForm<FormValues>({
        defaultValues: defaultFormValues,
    });

    const { total, items, emptyCart } = useCart();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        saveOrder({
            comment: data.comment,
            customer: {
                address: data.address,
                phoneIndicator: data.indicator,
                fullname: data.name,
                phone: data.phone,
            },
            date: new Date(),
            finalPrice: total,
            items: items.map((item) => {
                return {
                    product: item.product,
                    quantity: item.quantity,
                };
            }),
            storeId,
        })
            .then(() => {
                reset(defaultFormValues);
                emptyCart();
                setIsLoading(false);
                router.push(createSuccessRoute(storeSlug));
            })
            .catch((error) => {
                enqueueSnackbar(error.message, { variant: "error" });
                setIsLoading(false);
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                    <Card>
                        <CardBody className="2xs:p-2 md:p-4">
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex flex-column gap-2">
                                    <span className="text-lg font-bold">
                                        On y est presque !
                                    </span>
                                    <span className="text-sm">
                                        Remplissez ce formulaire pour passer
                                        commande
                                    </span>
                                </div>
                                <CustomerInfos
                                    control={control}
                                    trigger={trigger}
                                    errors={errors}></CustomerInfos>
                                <DeliveryOption
                                    control={control}></DeliveryOption>
                                <PaymentOption
                                    control={control}></PaymentOption>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-auto">
                    <CheckoutSummary
                        control={control}
                        isButtonLoading={isLoading}></CheckoutSummary>
                </div>
            </div>
        </form>
    );
}
