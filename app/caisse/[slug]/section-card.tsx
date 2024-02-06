import { Card, CardBody, Checkbox } from "@nextui-org/react";

export default function SectionCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Card shadow="none" className="border">
            <CardBody className="p-2">{children}</CardBody>
        </Card>
    );
}
