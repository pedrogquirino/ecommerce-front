import React from "react";
import CartIcon from "./CartIcon";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TvIcon from "@material-ui/icons/Tv";

const Div = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: #8fd1dd;
  width: 100%;
  height: 100px;
`;

const Bar = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const MenuBar = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TvIconStyled = withStyles({
  root: {
    paddingRight: 10,
    fontSize: 30,
  },
  label: {
    textTransform: "capitalize",
  },
})(TvIcon);

const MenuOption = styled.div`
  display: flex;
  padding: 10px;
`;

function Header() {
  return (
    <Div>
      <Bar>
        <MenuBar>
          <MenuOption>
            <TvIconStyled />
            <Typography variant="h6" component="h6">
              Electronics
            </Typography>
          </MenuOption>
          <CartIcon />
        </MenuBar>
      </Bar>
    </Div>
  );
}

export default Header;
