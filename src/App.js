import React, { createContext, useReducer } from "react";
import { createGlobalStyle } from "styled-components";
import Content from "./modules/common/Content";
import Header from "./modules/common/Header";

export const OrderContext = createContext();

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    margin: 0 auto;
  }
`;

function addOrderItem(state, newItem) {
  let productExists = false;
  let newList = [];
  newList = state.items.map((item) => {
    if (item.id === newItem.id) {
      productExists = true;
      item.quantity++;
      item.amount = item.amount + newItem.amount;
    }
    return item;
  });

  if (!productExists) {
    const item = {
      id: newItem.id,
      description: newItem.name,
      quantity: 1,
      amount: newItem.amount,
    };
    newList.push(item);
  }
  return newList;
}

function removeOrderItem(state, newItem) {
  return state.items.map((item) => {
    if (item.id === newItem.id) {
      if (item.quantity > 0) {
        item.quantity--;
        item.amount = item.amount - newItem.amount;
      }
    }
    return item;
  });
}

function App() {
  const memoizedReducer = React.useCallback((state, action) => {
    switch (action.type) {
      case "add":
        return {
          ...state,
          items: addOrderItem(state, action.payload),
        };

      case "remove":
        return {
          ...state,
          items: removeOrderItem(state, action.payload),
        };

      case "clean":
        return {
          ...state,
          items: [],
        };
      default:
        return state;
    }
  }, []);

  const orderInitialValue = {
    items: [],
    getItemQtd: (order, id) => {
      const item = order.items.filter((item) => item.id === id)[0];
      return item ? item.quantity : 0;
    },
    getTotal: (order) => {
      let total_quantity = 0;
      let total_amount = 0;
      order.items.forEach((item) => {
        total_quantity = total_quantity + item.quantity;
        total_amount = total_amount + item.amount;
      });
      return { total_quantity, total_amount };
    },
  };

  const [order, setOrder] = useReducer(memoizedReducer, orderInitialValue);

  return (
    <div>
      <GlobalStyle />
      <OrderContext.Provider value={{ order, setOrder }}>
        <Header />
        <Content />
      </OrderContext.Provider>
    </div>
  );
}
export default App;
