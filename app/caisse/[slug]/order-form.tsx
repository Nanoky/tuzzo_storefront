"use client";

import CheckoutSummary from "./checkout-summary";
import CustomerInfos from "./customer-infos";
import DeliveryOption from "./delivery-option";
import PaymentOption from "./payment-option";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCart } from "@/app/_shared/hooks/cart";
import { saveOrder } from "@/app/_shared/services/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSuccessRoute } from "@/app/_shared/services/router";
import { Store } from "@/business/models/store";
import { notifyError } from "@/app/_shared/services/notifier";

type Options<TKey> = Map<TKey, boolean>;
export type FormValues = {
    name: string;
    phone: string;
    address: string;
    optionDeliveryExpress: boolean; //Options<DeliveryOptions>;
    optionPaymentCash: boolean; //Options<PaymentOptions>;
    comment: string;
};

const defaultFormValues: FormValues = {
    name: "",
    phone: "+225",
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
    store,
    isWildcard,
}: {
    storeSlug: string;
    store: Store;
    isWildcard?: boolean;
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
            store,
        })
            .then(() => {
                reset(defaultFormValues);
                emptyCart();
                setIsLoading(false);
                router.push(
                    createSuccessRoute(isWildcard ? undefined : storeSlug)
                );
            })
            .catch((error) => {
                console.error(error);
                console.trace(error);
                notifyError(error.message);
                setIsLoading(false);
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                <div className="flex flex-col gap-4 lg:col-span-2">
                    <CustomerInfos
                        control={control}
                        trigger={trigger}
                        errors={errors}></CustomerInfos>
                    <DeliveryOption control={control}></DeliveryOption>
                    <PaymentOption control={control}></PaymentOption>
                </div>
                <div className="h-fit">
                    <CheckoutSummary
                        control={control}
                        isButtonLoading={isLoading}></CheckoutSummary>
                </div>
            </div>
        </form>
    );
}
