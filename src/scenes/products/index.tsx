import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, {useState} from 'react'
import Header from '../../components/Header'
import { useGetProductsQuery } from '../../state/api'

interface ProductProps{
    _id: string,
    name: string,
    description: string,
    price: number,
    rating: number,
    category: string,
    supply: number,
    stat: any,
}

const Product: React.FC<ProductProps> = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat,
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
        sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.default,
            borderRadius: "0.55rem",
        }}
        >
        <CardContent>
            <Typography
                sx={{ fontSize: 14 }}
                color={theme.palette.secondary.main}
                gutterBottom
            >
                {category}
            </Typography>
            <Typography variant="h5" component="div">
                {name}
            </Typography>
            <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary.main}>
                ${Number(price).toFixed(2)}
            </Typography>
            <Rating value={rating} readOnly />
            <Typography variant="body2">
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button
            variant='contained'
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
            >
            See More
            </Button>
        </CardActions>
        <Collapse
            in={isExpanded}
            timeout="auto"
            unmountOnExit
            sx={{
            color: theme.palette.secondary.contrastText,
            }}
        >
            <CardContent>
                <Typography>id: {_id}</Typography>
                <Typography>Supply Left: {supply}</Typography>
                <Typography>
                    Yearly Sales This Year: {stat.yearlySalesTotal}
                </Typography>
                <Typography>
                    Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
                </Typography>
            </CardContent>
        </Collapse>
        </Card>
    );
};

const Products = () => {
    const { data, isLoading } = useGetProductsQuery()
    const isNonMobile = useMediaQuery("(min-width: 1000px)")
    console.log(data)

    return (
        <Box margin="2rem">
            <Header title='Products' subtitle='See your products' />
            {data || !isLoading ? 
                (<Box mt="20px" display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%"
                    sx={{"& > div" : { gridColumn: isNonMobile ? undefined : "span 4"}}}>
                    {data?.map(
                        ({
                        _id,
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        stat,
                        }) => (
                        <Product
                            key={_id}
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            stat={stat}
                        />
                        )
                    )}
                </Box>) : 
                (<Box margin="20rem">
                    <Typography>
                        Loading ...
                    </Typography>
                </Box>)
            }
        </Box>
    )
}

export default Products