import {
    Loader,
    Title,
    Container,
    Text,
    TextInput,
    Group,
    Select,
    Paper,
    Badge,
    Grid,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { IconSearch, IconFilter, IconSparkles } from "@tabler/icons-react"
import ProductCard from "./ProductCard"
import { useState, useMemo } from "react"
import Whatsapp from '../../assets/whatsapp.png'
import GS from '../../assets/GS&CO Logo.jpg'

const fetchProducts = async () => {
    const response = await fetch("https://gs-co-be.onrender.com/api/products")
    if (!response.ok) throw new Error("Failed to fetch products")
    return response.json()
}


export default function AdminProducts() {

  const phoneNumber = '919443841358';
  const message = 'Hi! I would like to Order your Product.';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    })


    // Filters
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null)


    const uniqueCategories = useMemo((): string[] => {
        if (!data) return []
        const categorySet = new Set(data.map((item: any) => item.category).filter(Boolean))
        const categories = Array.from(categorySet) as string[]
        return ["All Categories", ...categories]
    }, [data])

    const filteredProducts = useMemo(() => {
        if (!data) return []
        return data.filter((product: any) => {
            const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = categoryFilter ? product.category === categoryFilter : true
            return matchesName && matchesCategory
        })
    }, [data, searchTerm, categoryFilter])

    return (
        <Container size="100%" py="xl">
            {/* Header Section */}
            <Paper
                p="xl"
                radius="xl"
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                    marginBottom: 32,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
                        borderRadius: "50%",
                    }}
                />

                <Group justify="space-between" align="center">
                    <div>
                        <img src={GS} alt="GSandCO" height={100} style={{borderRadius:"100%"}}/>
                    </div>
                    <div>
                        <Group align="center" gap="sm" mb="xs">
                            <IconSparkles size={32} color="#fbbf24" />
                            <Title
                                order={1}
                                style={{
                                    background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontSize: "2.5rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.025em",
                                }}
                            >
                                Welcome to GS & Co Premium Collection
                            </Title>
                        </Group>
                        <Text size="lg" c="gray.3" fw={500}>
                            Your luxury product catalog with precision and style
                        </Text>
                    </div>

                    <Badge
                        size="lg"
                        variant="light"
                        color="blue"
                        style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#93c5fd",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                        }}
                    >
                        {data?.length || 0} Products Available
                    </Badge>
                </Group>
            </Paper>

            {/* Controls Section */}
            <Paper
                // p="md"
                py="md"
                radius="lg"
                mb="xl"
            >
                <Group mb="md" grow className="filter-group">
                    <TextInput
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        className="search-input"
                        leftSection={<IconSearch size={18} />}
                    />
                    <Select
                        placeholder="All Categories"
                        data={uniqueCategories}
                        value={categoryFilter || 'All Categories'}
                        onChange={(value) =>
                            setCategoryFilter(value === 'All Categories' ? null : value)
                        }
                        className="category-select"
                        leftSection={<IconFilter size={18} />}
                    />
                </Group>
            </Paper>

            {/* Add Product Modal */}


            {/* Products Grid */}
            {isLoading ? (
                <Loader color="rgba(38, 36, 36, 1)" type="dots" />
            ) : error ? (
                <Paper p="xl" radius="lg" style={{ textAlign: "center" }}>
                    <Text c="red" size="lg" fw={600}>
                        Failed to load products
                    </Text>
                    <Text c="dimmed" mt="xs">
                        Please check your connection and try again
                    </Text>
                </Paper>
            ) : filteredProducts.length === 0 ? (
                <Paper p="xl" radius="lg" style={{ textAlign: "center" }}>
                    <Text size="lg" fw={600} c="dimmed">
                        No products found
                    </Text>
                    <Text c="dimmed" mt="xs">
                        Try adjusting your search or filter criteria
                    </Text>
                </Paper>
            ) : (
                <Grid gutter="xl" sjustify="center">
                    {filteredProducts.map((product: any) => (
                        <Grid.Col key={product._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                            <ProductCard product={product} />
                        </Grid.Col>
                    ))}
                </Grid>
            )}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }}
            >
                <img
                    height={50}
                    src={Whatsapp}
                    alt="WhatsApp"
                />
            </a>
        </Container>
    )
}
