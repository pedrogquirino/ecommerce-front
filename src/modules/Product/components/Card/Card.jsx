import React, { useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { OrderContext } from "../../../../App";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 220,
    minWidth: 220,
    padding: 10,
  },
  media: {
    height: 200,
  },
}));

const CardContentStyled = withStyles({
  root: {
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
})(CardContent);

const ButtonStyled = withStyles({
  root: {
    minWidth: 35,
    padding: 0,
  },
})(Button);

const TextFieldStyled = withStyles({
  root: {
    textAlign: "center",
    paddingRight: 5,
    width: 45,
  },
})(TextField);

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default function MediaCard({ product }) {
  const { order, setOrder } = useContext(OrderContext);
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContentStyled>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.brand}
          </Typography>
          <Typography
            align="right"
            color="secondary"
            gutterBottom
            variant="h6"
            component="h2"
          >
            <NumberFormat
              value={product.amount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"R$"}
            />
          </Typography>
        </CardContentStyled>
      </CardActionArea>
      <Controls>
        <TextFieldStyled
          size="small"
          id="outlined-basic"
          disabled
          variant="outlined"
          value={order.getItemQtd(order, product.id)}
        />
        <ButtonStyled
          onClick={() => {
            setOrder({
              type: "add",
              payload: product,
            });
          }}
        >
          <AddCircleIcon color="primary" />
        </ButtonStyled>
        <ButtonStyled
          onClick={() => {
            setOrder({
              type: "remove",
              payload: product,
            });
          }}
        >
          <RemoveCircleIcon color="secondary" />
        </ButtonStyled>
      </Controls>
    </Card>
  );
}
