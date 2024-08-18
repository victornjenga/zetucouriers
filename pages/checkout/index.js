import { useRef, useState } from "react";
import { useStateContext } from "../../context/StateContext";
import Axios from "axios";
import { useRouter } from "next/router";
import { createElement } from "react";
import { useContext } from "react";
import { CurrencyContext } from "../../context/CurrencyProvider";
import emailjs from "emailjs-com";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("");

  const [phone, setPhone] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");

  const form = useRef();

  const router = useRouter();
  const { totalPrice, cartItems } = useStateContext();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (firstName.length <= 0) {
      tempErrors["firstName"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }

    if (!phone) {
      tempErrors["phone"] = true;
      isValid = false;
    }

    if (location.length <= 0) {
      tempErrors["location"] = true;
      isValid = false;
    }

    setError({ ...tempErrors });
    return isValid;
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    let isValidForm = handleValidation();

    if (isValidForm) {
      emailjs
        .sendForm(
          "service_l3cll2e",
          "template_knt44cp",
          form.current,
          "Ewe0bF4Zsv6KD7MqD"
        )
        .then((result) => {
          setShowSuccessMessage(true);
          setShowFailureMessage(false);
          router.push(selectedOption);
        })
        .catch((error) => {
          setShowSuccessMessage(false);
          setShowFailureMessage(true);
          setButtonText("error");

          return;
        });
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Submit");
    }
  };

  // Prepare cartItems string with size variations included
  const cartItemsString = cartItems
    .map((item) => {
      // Check if size is available
      const sizeString = item.size ? `, Size: ${item.size.title}` : "";

      return `Product Name: ${item.name}, Price: ${item.price}${sizeString}`;
    })
    .join("<br><br>");

  return (
    <div className="flex relative pt-32 md:pt-56 items-center z-0 flex-col">
      <h3 className="text-2xl">Make payment for your Booking</h3>
      <div className="px-10  gap-10 space-y- my-6 justify-around items-center block  md:flex ">
        <form
          onSubmit={handleButtonClick}
          ref={form}
          className="flex flex-col p-6 space-y-5"
        >
          <input
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            name="firstName"
            value={firstName}
            className=" bg-slate-200 left-0 text-black  py-1 px-2 outline-none  rounded-xl"
          />{" "}
          <input
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            value={lastName}
            name="lastName"
            className=" bg-slate-200 left-0 text-black  py-1 px-2 outline-none  rounded-xl"
          />{" "}
          <input
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            value={phone}
            name="phone"
            className=" bg-slate-200 text-black py-1 px-2 outline-none  rounded-xl"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
            name="email"
            className=" bg-slate-200 left-0 text-black py-1 px-2 outline-none  rounded-xl"
          />{" "}
          <input
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Address"
            value={location}
            name="location"
            className=" bg-slate-200 left-0 text-black px-2 py-1 outline-none  rounded-xl"
          />
          <input type="hidden" name="cartItems" value={cartItemsString} />
          <input
            type="hidden"
            name="paymentMethod"
            value={
              selectedOption === "/checkout/mpesa"
                ? "Safaricom Mpesa"
                : "Cash on Delivery"
            }
          />
          <div>
            <div class="flex gap-4 justify-cente items-center mb-2">
              <input
                type="radio"
                name="relocate"
                value="/checkout/mpesa"
                onChange={handleSelectChange}
              />
              <div className="flex justify-center gap-3 items-center ">
                <div className="px-5 py-2 border border-gray-500 rounded-sm">
                  <img src="/mpesa.png" className="w-20 " alt="" />
                </div>
                <p>Safaricom Mpesa</p>
              </div>
            </div>
            <div class="flex gap-4 justify-cente items-center mb-2">
              <input
                type="radio"
                name="relocate"
                value="/checkout/cash"
                onChange={handleSelectChange}
              />
              <div className="flex justify-center gap-3 items-center ">
                <div className="px-5 py-2 border border-gray-500 rounded-sm">
                  <img src="/cash.png" className="w-20 " alt="" />
                </div>
                <p>Cash on Delivery</p>
              </div>
            </div>
          </div>
          <div className="gap-2">
            <h2 className="text-xl font-semibold py-2">Complete order</h2>
            <p className="py-1">
              The order total is{" "}
              <span className="font-bold"> Ksh {totalPrice}</span>{" "}
            </p>
            <p>Select a payment method, and then proceed to payment.</p>
            <button
              disabled={selectedOption ? false : true}
              // onClick={handleButtonClick}
              className="bg-blue-500 my-2 disabled:bg-blue-300 rounded-md text-white px-3 py-2 "
            >
              Make Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
