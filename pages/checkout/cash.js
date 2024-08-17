import Link from "next/link";
import React from "react";

function cash() {
  return (
    <div className="flex relative px-3 pt-56 items-center z-0 flex-col">
      <h3 className="text-2xl font-medium py-3">Here's what happens next.</h3>
      {/* <p className="py-3 font-medium text-xl">Select Lipa na M-Pesa, then Pay Bill and enter:</p> */}
      <ul className="text-xl">
        <li>1. You will shortly receive an email confirming your order.</li>
        <li>2. We will verify your payment</li>
        <li>
          3. We will call you within one working day to confirm your delivery
          details and arrange a time for delivery. For click and collect orders,
          we will notify you as soon as your order is ready for collection.
        </li>
      </ul>
      <p className="py-2">
        If you have any questions or concerns about your order, please{" "}
        <span className="text-blue-400">
          <Link href="/">contact our customer support team.</Link>
        </span>
      </p>
      <Link href="/">
        <button className="bg-yellow-700 my-4 rounded-lg  px-3 py-2 text-slate-50">
          I have made Payment
        </button>
      </Link>
    </div>
  );
}

export default cash;
