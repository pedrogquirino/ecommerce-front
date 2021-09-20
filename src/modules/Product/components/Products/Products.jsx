import Card from "../Card";
import styled from "styled-components";

const Grid = styled.div`
  width: 1000px;
`;

const List = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
  column-gap: 30px;
  row-gap: 30px;
`;
const productList = [
  {
    id: 1,
    name: "Smart TV",
    brand: "Samsung",
    imageUrl: "/images/tv-samsung.jpeg",
    amount: 2000,
  },
  {
    id: 2,
    name: "Smart TV",
    brand: "LG",
    imageUrl: "/images/tv-lg.jpg",
    amount: 2000,
  },
  {
    id: 3,
    name: "Iphone",
    brand: "Apple",
    imageUrl: "/images/iphone.jpg",
    amount: 7500,
  },
  {
    id: 4,
    name: "Notebook",
    brand: "Asus",
    imageUrl: "/images/notebook.jpg",
    amount: 4500,
  },
];

function Products() {
  return (
    <Grid>
      <List>
        {productList.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </List>
    </Grid>
  );
}

export default Products;
