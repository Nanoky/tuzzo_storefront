"use client";

import { Card, CardBody } from "@nextui-org/react";
import CheckoutSummary from "./checkout-summary";
import CustomerInfos from "./customer-infos";
import DeliveryOption from "./delivery-option";
import PaymentOption from "./payment-option";
import { useForm } from "react-hook-form";

export default function OrderForm() {
    const {} = useForm();
    return (
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
                            <CustomerInfos></CustomerInfos>
                            <DeliveryOption></DeliveryOption>
                            <PaymentOption></PaymentOption>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-4">
                <CheckoutSummary></CheckoutSummary>
            </div>
        </div>
    );
}
