import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // const getData = async () => {
    //   const url = `http://localhost:3030/${optionType}`;
    //   console.log(url);
    //   const resp = await axios.get(url).catch((err) => console.log(err));
    //   console.log(resp)
    //   setItems(resp.data);
    // };
    // getData();
    axios
      .get(`http://localhost:3080/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
        console.log(error)
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => {
    return (
      <ItemComponent key={item.name} name={item.name} image={item.imagePath} />
    );
  });

  return <Row>{optionItems}</Row>;
}
