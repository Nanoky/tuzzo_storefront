import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

export default function Footer({ storeName }: { storeName: string }) {
    const year = new Date().getFullYear();
    return (
        <footer className="footer py-3 bg-black text-white">
            <div className="flex flex-column justify-center items-center gap-3">
                <div className="text-primary text-lg flex flex-row justify-center items-center gap-3">
                    <Button
                        type="button"
                        radius="full"
                        className="text-primary bg-white"
                        isIconOnly>
                        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    </Button>
                    <Button
                        type="button"
                        className="text-primary bg-white"
                        radius="full"
                        isIconOnly>
                        <FontAwesomeIcon icon={faWhatsapp}></FontAwesomeIcon>
                    </Button>
                </div>
                <div>
                    <span className="text-xs">
                        ©{year} {storeName}. Boutique crée avec Tuzzo 🚀
                    </span>
                </div>
            </div>
        </footer>
    );
}
