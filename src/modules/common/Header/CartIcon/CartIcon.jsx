import React, { useContext } from "react";
import { OrderContext } from "../../../../App";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const Cart = styled.div`
  padding: 10px;
`;

const Values = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 160px;
`;

const Label = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none !important;
`;

const CartIconStyled = withStyles({
  root: {
    fontSize: 35,
  },
  label: {
    textTransform: "capitalize",
  },
})(ShoppingCartIcon);

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const ORDER_ENDPOINT = "http://localhost:3001/orders";

function cartCheckout(order) {
  const { total_quantity, total_amount } = order.getTotal(order);
  const orderCheckout = {
    total_amount: total_amount,
    total_quantity: total_quantity,
    items: order.items.map((item) => {
      return {
        description: item.description,
        quantity: item.quantity,
        amount: item.amount,
      };
    }),
  };

  fetch(ORDER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(orderCheckout),
  }).then((response) => {
    response.text().then((result) => {
      alert(result);
    });
  });
}

function CartIcon() {
  const { order, setOrder } = useContext(OrderContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      padding: 10,
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      disableScrollLock={true}
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  return (
    <Link href="#">
      <Cart>
        <StyledBadge
          badgeContent={order.getTotal(order).total_quantity}
          color="secondary"
          onClick={handleClick}
        >
          <CartIconStyled />
        </StyledBadge>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Values>
            <Label>
              <div>Quantity:</div>
              <div>{order.getTotal(order).total_quantity}</div>
            </Label>
            <Label>
              <div>Ammount:</div>
              <div>
                <NumberFormat
                  value={order.getTotal(order).total_amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                />
              </div>
            </Label>
            <Label />
            <Link href="#">
              <Label
                style={{ justifyContent: "flex-start" }}
                onClick={() => {
                  setOrder({
                    type: "clean",
                  });
                }}
              >
                <DeleteIcon color="secondary" />
              </Label>
            </Link>
            <Label>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => cartCheckout(order)}
              >
                Checkout
              </Button>
            </Label>
          </Values>
        </StyledMenu>
      </Cart>
    </Link>
  );
}

export default CartIcon;
