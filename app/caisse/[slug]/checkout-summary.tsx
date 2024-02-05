"use client";
import { useCart } from "@/app/_shared/hooks/cart";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, Input } from "@nextui-org/react";
import { useState } from "react";

export default function CheckoutSummary() {
    const [comment, setComment] = useState("");
    const { total } = useCart();

    const handleCommentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setComment(event.target.value);
    };
    return (
        <Card>
            <CardHeader>
                <div className="d-flex flex-column">
                    <span className="text-normal text-semibold">Resumé de la commande</span>
                    <span className="text-sm">Voici le total de votre commande</span>
                </div>
            </CardHeader>
            <Divider></Divider>
            <CardBody>
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                        <span className="text-sm">Sous-total</span>
                        <span className="text-normal">{total}F</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="text-normal">
                            Total{" "}
                            <FontAwesomeIcon
                                icon={faCircleInfo}></FontAwesomeIcon>
                        </span>
                        <span className="text-xl text-bold">{total}F</span>
                    </div>
                    <div>
                        <Input
                            type="text"
                            variant="underlined"
                            label="D'autres commentaires sur votre commande"
                            value={comment}
                            onChange={handleCommentChange}></Input>
                    </div>
                </div>
            </CardBody>
            <Divider></Divider>
            <CardFooter>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-primary rounded-pill">
                        Commander
                    </button>
                </div>
            </CardFooter>
        </Card>
    );
}
