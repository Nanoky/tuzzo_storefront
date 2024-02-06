"use client";

import { Card, CardBody } from "@nextui-org/react";
import CheckoutSummary from "./checkout-summary";
import CustomerInfos from "./customer-infos";
import DeliveryOption from "./delivery-option";
import PaymentOption from "./payment-option";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeliveryOptions, PaymentOptions } from "@/app/_shared/shared/enums";
import { useCart } from "@/app/_shared/hooks/cart";
import { saveOrder } from "@/app/_shared/services/order";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export type FormValues = {
    name: string;
    phone: string;
    indicator: string;
    address: string;
    optionDelivery: DeliveryOptions;
    optionPayment: PaymentOptions;
    comment: string;
};

export default function OrderForm({
    storeSlug,
    storeId,
}: {
    storeSlug: string;
    storeId: string;
}) {
    const { handleSubmit, control, reset, getFieldState } = useForm<FormValues>(
        {
            defaultValues: {
                name: "",
                phone: "",
                indicator: "",
                address: "",
                optionDelivery: DeliveryOptions.EXPRESS,
                optionPayment: PaymentOptions.CREDIT_CARD,
                comment: "",
            },
        }
    );

    const { total, items, emptyCart } = useCart();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
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
                reset({
                    name: "",
                    phone: "",
                    indicator: "",
                    address: "",
                    optionDelivery: DeliveryOptions.EXPRESS,
                    optionPayment: PaymentOptions.CREDIT_CARD,
                    comment: "",
                });
                emptyCart();
                router.push(`/success/${storeSlug}`);
            })
            .catch((error) => {
                enqueueSnackbar(error.message, { variant: "error" });
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-8">
                    <Card>
                        <CardBody>
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
                                    getState={getFieldState}></CustomerInfos>
                                <DeliveryOption
                                    control={control}></DeliveryOption>
                                <PaymentOption
                                    control={control}></PaymentOption>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <CheckoutSummary control={control}></CheckoutSummary>
                </div>
            </div>
        </form>
    );
}
