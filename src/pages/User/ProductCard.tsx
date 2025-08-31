"use client";

import {
    Card,
    Text,
    Button,
    Group,
    Image,
    Badge,
    ActionIcon,
    Stack,
    Divider,
    Modal,
} from "@mantine/core";
import { IconEdit, IconStar, IconDownload } from "@tabler/icons-react";
import { useState } from "react";

const stockOptions = [
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
    { value: "pre-order", label: "Pre-Order" },
    { value: "discontinued", label: "Discontinued" },
];

export default function AdminProductCard({ product }: any) {
    const [opened, setOpened] = useState(false);

    const getStockBadgeColor = (stock: string) => {
        switch (stock) {
            case "in-stock":
                return "teal";
            case "low-stock":
                return "yellow";
            case "out-of-stock":
                return "red";
            case "pre-order":
                return "blue";
            case "discontinued":
                return "gray";
            default:
                return "gray";
        }
    };

    const handleDownloadImage = async () => {
        try {
            const imageUrl = product.image || "/placeholder.svg";
            const response = await fetch(imageUrl, { mode: "cors" });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `${product.name || "product-image"}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Image download failed", error);
        }
    };


    return (
        <>
            {/* Product Card */}
            <Card
                shadow="xl"
                padding={0}
                radius="lg"
                withBorder
                style={{
                    maxWidth: 340,
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                className="premium-product-card"
            >
                <Card.Section style={{ position: "relative", borderBottom: "none" }}>
                    <Image
                        src={product.image || "/placeholder.svg"}
                        height={220}
                        alt={product.name}
                        fit="cover"
                        style={{
                            filter: "brightness(1.02) contrast(1.05)",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            display: "flex",
                            gap: 8,
                        }}
                    >
                        <Badge
                            size="sm"
                            color={getStockBadgeColor(product.stock)}
                            variant="filled"
                            style={{
                                backdropFilter: "blur(8px)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            }}
                        >
                            {stockOptions.find((opt) => opt.value === product.stock)?.label ||
                                product.stock}
                        </Badge>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                        }}
                    >
                        <ActionIcon
                            size="sm"
                            variant="filled"
                            style={{
                                backdropFilter: "blur(8px)",
                                backgroundColor: "#fbbf24",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            }}
                        >
                            <IconStar size={14} color="black" />
                        </ActionIcon>
                    </div>
                </Card.Section>

                <Stack gap="md" p="md">
                    <div>
                        <Group justify="space-between" align="center">
                            <Text
                                fw={700}
                                size="lg"
                                style={{
                                    color: "#1e293b",
                                    lineHeight: 1.3,
                                }}
                            >
                                {product.name}
                            </Text>

                            {product.size && (
                                <Badge
                                    size="md"
                                    color="orange"
                                    variant="outline"
                                    style={{
                                        textTransform: "none",
                                        fontWeight: 600,
                                        letterSpacing: "0.3px",
                                    }}
                                >
                                    {product.size}
                                </Badge>
                            )}
                        </Group>

                        <Text
                            size="sm"
                            c="dimmed"
                            tt="uppercase"
                            fw={500}
                            style={{ letterSpacing: "0.5px", marginTop: 4 }}
                        >
                            {product.category}
                        </Text>
                    </div>
                    <Divider color="#e5e5e5" />
                    {product.price > 0 && (
                        <Group justify="space-between" align="center">
                            <Text
                                fw={700}
                                size="xl"
                                style={{
                                    color: "#000000", // solid black for visibility
                                }}
                            >
                                ₹{product.price?.toLocaleString()}
                            </Text>
                        </Group>
                    )}

                    <Group grow>
                        <Button
                            variant="light"
                            color="dark"
                            leftSection={<IconEdit size={16} />}
                            style={{
                                background: "#18181b",
                                color: "#ffffff",
                                border: "1px solid #3f3f46",
                                fontWeight: 600,
                            }}
                            onClick={() => setOpened(true)}
                        >
                            View Details
                        </Button>
                    </Group>
                </Stack>
            </Card>

            {/* Modal */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                size="lg"
                title={
                    <Text fw={800} size="xl" style={{ color: "#111111" }}>
                        {product.name}
                    </Text>
                }
                radius="lg"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 6,
                }}
                styles={{
                    content: {
                        color: "#111111", // Dark text for all modal content
                    },
                }}
            >
                <Stack gap="lg">
                    {/* Image with Download */}
                    <div style={{ position: "relative" }}>
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            radius="md"
                        />
                        <ActionIcon
                            variant="filled"
                            onClick={handleDownloadImage}
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                backgroundColor: "#18181b",
                            }}
                        >
                            <IconDownload size={18} color="#ffffff" />
                        </ActionIcon>
                    </div>

                    {/* Details */}
                    <div>
                        <Text fw={500} size="md" mb="sm" style={{ color: "#555555" }}>
                            Product: <span style={{ color: "#000000" }}>{product.name}</span>
                        </Text>

                        <Text fw={500} size="md" mb="sm" style={{ color: "#555555" }}>
                            Category: <span style={{ color: "#000000" }}>{product.category}</span>
                        </Text>

                        {product.size && (
                            <Text fw={600} size="sm" mb={4} style={{ color: "#555555" }}>
                                Size: <span style={{ color: "#000000" }}>{product.size}</span>
                            </Text>
                        )}

                        {product.price > 0 && (
                            <Text fw={600} size="sm" mb={4} style={{ color: "#555555" }}>
                                Price: <span style={{ color: "#000000" }}>₹{product.price?.toLocaleString()}</span>
                            </Text>
                        )}

                    </div>
                </Stack>
            </Modal>
            <style        >{`
        .premium-product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
        </>
    );
}
