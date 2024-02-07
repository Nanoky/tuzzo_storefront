import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Key, useState } from "react";

export default function SectionAccordion({
    id,
    title,
    hasSubtitle = true,
    subtitleCollapsed,
    subtitleExpanded,
    children,
}: {
    id: string;
    title: string;
    hasSubtitle?: boolean;
    subtitleCollapsed?: string;
    subtitleExpanded?: string;
    children: React.ReactNode;
}) {
    const [isCollapse, setIsCollapsed] = useState(false);

    const handleSelectionChange = (keys: "all" | Set<Key>) => {
        if (keys === "all") {
            setIsCollapsed(false);
        } else if (keys.size > 0 && keys.has(id)) {
            setIsCollapsed(false);
        } else setIsCollapsed(true);
    };
    return (
        <Accordion
            isCompact
            defaultSelectedKeys={"all"}
            onSelectionChange={handleSelectionChange}>
            <AccordionItem
                title={title}
                subtitle={
                    hasSubtitle
                        ? isCollapse
                            ? subtitleCollapsed
                            : subtitleExpanded
                        : undefined
                }
                key={id}
                indicator={<FontAwesomeIcon icon={faChevronRight} />}>
                {children}
            </AccordionItem>
        </Accordion>
    );
}
