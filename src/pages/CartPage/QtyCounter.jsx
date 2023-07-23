import { useState } from "react";

export default function QtyCounter({ bookQty }) {
  const [totalQty, setTotalQty] = useState(bookQty);

  function addQty() {
    if (totalQty === 10) {
      return;
    }
    setTotalQty(totalQty + 1);
  }

  function minusQty() {
    if (totalQty === 1) {
      return;
    }
    setTotalQty(totalQty - 1);
  }

  return (
    <>
      <span
        uk-icon="plus"
        ratio="0.5"
        className="uk-margin-small-right"
        onClick={addQty}
      ></span>
      {totalQty}
      <span
        uk-icon="minus"
        ratio="0.5"
        className="uk-margin-small-left"
        onClick={minusQty}
      ></span>
    </>
  );
}
