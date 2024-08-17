import React from "react";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";

function mpesa() {
  const { totalPrice, cartItems } = useStateContext();

  return (
    <div className="flex relative px-3 pt-56 items-center z-0 flex-col">
      <h3 className="text-2xl font-medium py-3">
        Pay with Safaricom M-Pesa on your phone.
      </h3>
      <p className="py-3 font-medium text-xl">
        Select Lipa na M-Pesa, then Pay Bill and enter:
      </p>
      <ul className="text-xl">
        <li>
          1. <span className="font-semibold">222111</span> for the business
          number.
        </li>
        <li>
          2. <span className="font-semibold">2183101</span> for the
          account number.
        </li>
        <li>
          3. Ksh <span className="font-semibold">{totalPrice}</span> for the
          amount to be paid.
        </li>
        <li>4. Your M-Pesa PIN to complete the transaction.</li>
      </ul>
      <Link href="/">
        <button className="bg-yellow-700 my-4 rounded-lg  px-3 py-2 text-slate-50">
          I have made Payment
        </button>
      </Link>
    </div>
  );
}

export default mpesa;
