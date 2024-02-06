"use client";
import {
    Button,
    Input,
} from "@nextui-org/react";
import { useState } from "react";
import SectionCard from "./section-card";
import SectionAccordion from "./section-accordion";

export default function CustomerInfos() {
    const [indicator, setIndicator] = useState("+225");
    const [phone, setPhone] = useState("");
    const [nom, setNom] = useState("");
    const [address, setAddress] = useState("");

    const handleChangeIndicator = (value: string) => {
        setIndicator(value);
    };

    const handleChangePhone = (value: string) => {
        setPhone(value);
    };

    const handleChangeNom = (value: string) => {
        setNom(value);
    };

    const handleChangeAddress = (value: string) => {
        setAddress(value);
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
                                <Input
                                    type="text"
                                    variant="underlined"
                                    value={indicator}
                                    onChange={(e) =>
                                        handleChangeIndicator(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col">
                                <Input
                                    type="text"
                                    variant="underlined"
                                    placeholder="Numéro de téléphone"
                                    value={phone}
                                    onChange={(e) =>
                                        handleChangePhone(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <Input
                            type="text"
                            variant="underlined"
                            placeholder="Entrez votre nom"
                            value={nom}
                            onChange={(e) => handleChangeNom(e.target.value)}
                        />
                        <Input
                            type="text"
                            variant="underlined"
                            placeholder="Entrez votre adresse de livraison"
                            value={address}
                            onChange={(e) =>
                                handleChangeAddress(e.target.value)
                            }
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button type="submit" color="primary" radius="full">
                            {"Enregistrer l'adresse"}
                        </Button>
                    </div>
                </div>
            </SectionAccordion>
        </SectionCard>
    );
}
