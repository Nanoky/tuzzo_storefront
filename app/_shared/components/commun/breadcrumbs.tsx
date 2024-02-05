import { faHouse, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Breadcrumbs({
    title,
    home_url,
}: {
    title: string;
    home_url: string;
}) {
    return (
        <>
            <Link href={`${home_url}`}>
                <button
                    type="button"
                    className="btn border border-2 border-primary rounded-3 bg-secondary text-white"
                    title="Voir la Boutique">
                    <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
                </button>
            </Link>
            <span>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </span>
            <button
                type="button"
                className="btn btn-outline-primary rounded-pill">
                {title}
            </button>
        </>
    );
}
