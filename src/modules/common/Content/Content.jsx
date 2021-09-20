import styled from "styled-components";
import Product from "../../Product";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Content() {
  return (
    <Div>
      <Product />
    </Div>
  );
}

export default Content;
