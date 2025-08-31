import { Paper, Group, Stack, Text, ActionIcon, Divider, Flex } from "@mantine/core";
import { IconBrandInstagram, IconMail, IconMapPin } from "@tabler/icons-react";
import GS from "../../assets/GS&CO Logo.jpg";

export default function Footer() {
    return (
        <Paper
            p="xl"
            radius="xl"
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                marginTop: 48,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: -50,
                    left: -50,
                    width: 200,
                    height: 200,
                    background:
                        "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                }}
            />
            <Flex
                gap="xl"
                justify="space-between"
                align="flex-start"
                wrap="wrap"
                direction={{ base: "column", sm: "row" }}
            >
                <Stack gap="xs" style={{ flex: 1, minWidth: 220, alignItems: "center" }}>
                    <img
                        src={GS}
                        alt="GSandCO"
                        height={140}
                        width={140}
                        style={{ borderRadius: "100%" }}
                    />
                    <Text
                        fw={700}
                        size="lg"
                        style={{
                            color: "#f1f5f9",
                            letterSpacing: "0.5px",
                            textAlign: "center",
                        }}
                    >
                        GS & Co
                    </Text>
                </Stack>
                <Stack
                    gap="sm"
                    style={{
                        flex: 1,
                        minWidth: 220,
                        textAlign: "center",
                    }}
                >
                    <Text fw={600} size="md" c="gray.2">
                        Address
                    </Text>
                    <Text size="sm" c="gray.4">
                       65, Kamaraj St, <br />
                         NMS Compound, Erode Fort,<br />
                       Erode, Tamil Nadu 638001 <br /> +91 94438 41358
                    </Text>

                    <Group gap="md" mt="sm" justify="center">
                        <ActionIcon
                            size="lg"
                            variant="light"
                            radius="xl"
                            color="pink"
                            component="a"
                            href="https://www.instagram.com/gs_co2025?igsh=Z2JxdG9yOHRrN2d1"
                            target="_blank"
                            style={{
                                backgroundColor: "rgba(236, 72, 153, 0.15)",
                                border: "1px solid rgba(236,72,153,0.3)",
                                transition: "all 0.3s ease",
                            }}
                            className="hover-glow"
                        >
                            <IconBrandInstagram size={20} />
                        </ActionIcon>

                        <ActionIcon
                            size="lg"
                            variant="light"
                            radius="xl"
                            color="blue"
                            component="a"
                            href="mailto:govindasamy.textitle@gmail.com"
                            style={{
                                backgroundColor: "rgba(59,130,246,0.15)",
                                border: "1px solid rgba(59,130,246,0.3)",
                                transition: "all 0.3s ease",
                            }}
                            className="hover-glow"
                        >
                            <IconMail size={20} />
                        </ActionIcon>

                        <ActionIcon
                            size="lg"
                            variant="light"
                            radius="xl"
                            color="green" 
                            component="a"
                            href="https://g.co/kgs/sPrF4nn"
                            target="_blank"
                            style={{
                                backgroundColor: "rgba(157, 231, 167, 0.3)", 
                                border: "1px solid rgba(97, 196, 77, 0.5)",   
                                transition: "all 0.3s ease",
                            }}
                            className="hover-glow"
                        >
                            <IconMapPin size={20} color="#4CAF50" />
                        </ActionIcon>

                    </Group>
                </Stack>
                <Stack
                    gap="sm"
                    style={{
                        flex: 1,
                        minWidth: 220,
                        textAlign: "center",
                    }}
                >
                    <Text fw={600} size="md" c="gray.2">
                        Our Motto
                    </Text>
                    <Text size="sm" c="gray.4" fs="italic">
                        “Fashion is the armor to survive the reality of everyday life.
                        At GS & Co, we weave elegance into every garment.”
                    </Text>
                </Stack>
            </Flex>
            <Divider my="lg" color="rgba(255,255,255,0.1)" />
            <Text size="xs" ta="center" c="gray.5">
                © {new Date().getFullYear()} GS & Co. All rights reserved.
            </Text>
        </Paper>
    );
}
