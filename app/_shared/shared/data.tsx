import { MoneyIcon } from "@/app/_shared/components/commun/icons/money-icon";
import { PaymentOptions } from "./enums";
import { WaveIcon } from "../components/commun/icons/wave-icon";
import { OrangeIcon } from "../components/commun/icons/orange-icon";
import { MTNIcon } from "../components/commun/icons/mtn-icon";

export const PAYMENT_OPTIONS: {
    option: PaymentOptions;
    label: string;
    icon: React.ReactNode;
}[] = [
    {
        option: PaymentOptions.CASH,
        label: "Paiement à la livraison",
        icon: <MoneyIcon />,
    },
    {
        option: PaymentOptions.WAVE,
        label: "Wave Money",
        icon: <WaveIcon />,
    },
    {
        option: PaymentOptions.ORANGE,
        label: "Orange Money",
        icon: <OrangeIcon />,
    },
    {
        option: PaymentOptions.MTN,
        label: "MTN Money",
        icon: <MTNIcon />,
    },
];
