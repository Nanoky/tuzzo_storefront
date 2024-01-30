import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer({ storeName }: { storeName: string }) {
    const year = new Date().getFullYear();
    return (
        <footer className="footer py-3 bg-black text-white">
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div className="text-primary fs-2 d-flex flex-row justify-content-center align-items-center gap-3">
                    <button
                        type="button"
                        title="Call"
                        className="btn bg-white rounded-circle">
                        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    </button>
                    <button
                        type="button"
                        title="Whatsapp"
                        className="btn bg-white rounded-circle">
                        <FontAwesomeIcon icon={faWhatsapp}></FontAwesomeIcon>
                    </button>
                </div>
                <div>
                    <span>
                        ©{year} {storeName}. Boutique crée avec Tuzzo 🚀
                    </span>
                </div>
            </div>
        </footer>
    );
}
