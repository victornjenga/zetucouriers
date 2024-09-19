import { useRef, useState } from "react";
import { useStateContext } from "../../context/StateContext"; // Assuming you have a cart context for managing cart state
import { client } from "../../utils/client"; // Sanity client for sending data
import { useRouter } from "next/router";
import emailjs from "emailjs-com";
import { v4 as uuidv4 } from "uuid"; // Importing UUID generator

export default function Checkout() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState({});
  const form = useRef();
  const router = useRouter();

  const { totalPrice, cartItems, clearCart } = useStateContext(); // Assuming cartItems and totalPrice are from the context

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleValidation = () => {
    const tempErrors = {};
    let isValid = true;

    if (!firstName) {
      tempErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!lastName) {
      tempErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    if (!phone) {
      tempErrors.phone = "Phone number is required";
      isValid = false;
    }
    if (!location) {
      tempErrors.location = "Location is required";
      isValid = false;
    }
    if (!paymentMethod) {
      tempErrors.paymentMethod = "Payment method is required";
      isValid = false;
    }

    setError(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleValidation();

    if (!isValid) return;

    setLoading(true); // Set loading to true when starting form submission

    const orderData = {
      _type: "orders",
      firstName,
      lastName,
      email,
      phone,
      location,
      paymentMethod,
      totalPrice,
      cartItems: cartItems.map((item) => ({
        _key: uuidv4(), // Add a unique key to each item
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || "",
      })),
      status: "pending",
      orderDate: new Date().toISOString(),
    };

    try {
      // Save the order in Sanity
      await client.create(orderData);

      // Optionally send an email confirmation using emailjs (if configured)
      emailjs.sendForm(
        "service_l3cll2e",
        "template_knt44cp",
        form.current,
        "Ewe0bF4Zsv6KD7MqD"
      );

      // Clear the cart and reset the loading state
      setLoading(false);

      // Navigate based on the selected payment method
      if (paymentMethod === "mpesa") {
        router.push("/checkout/mpesa");
      } else if (paymentMethod === "cash") {
        router.push("/checkout/cash");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      setLoading(false); // Reset loading if there's an error
    }
  };

  // Prepare cartItems string with size variations included
  const cartItemsString = cartItems
    .map((item) => {
      const sizeString = item.size ? `, Size: ${item.size.title}` : "";
      return `Product Name: ${item.name}, Price: ${item.price}${sizeString}`;
    })
    .join("<br><br>");

  return (
    <div className="flex w-full justify-center pt-40 items-center z-0 flex-col">
      <h3 className="text-2xl my-6">Make payment for your order</h3>
      <div className=" justify-center md:flex items-center w-[90%] md:w-[90%]">
        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
            {/* First Column */}
            <div className="space-y-2 ">
              <div>
                <label className="block mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  placeholder="John"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-slate-200 dark:bg-gray-700 text-black py-2 px-3 outline-none rounded-xl w-full"
                />
                {error.firstName && (
                  <p className="text-red-500">{error.firstName}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  placeholder="Doe"
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-slate-200 dark:bg-gray-700 text-black py-2 px-3 outline-none rounded-xl w-full"
                />
                {error.lastName && (
                  <p className="text-red-500">{error.lastName}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="w5jLs@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-200 dark:bg-gray-700 text-black py-2 px-3 outline-none rounded-xl w-full"
                />
                {error.email && <p className="text-red-500">{error.email}</p>}
              </div>

              <div>
                <label className="block mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  placeholder="0712345678"
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-200 dark:bg-gray-700 text-black py-2 px-3 outline-none rounded-xl w-full"
                />
                {error.phone && <p className="text-red-500">{error.phone}</p>}
              </div>

              <div>
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  placeholder="Nairobi, Kenya"
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-slate-200 dark:bg-gray-700 text-black py-2 px-3 outline-none rounded-xl w-full"
                />
                {error.location && (
                  <p className="text-red-500">{error.location}</p>
                )}
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Select Payment Method
                </h4>
                <div className="flex gap-4 items-center">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      onChange={handlePaymentMethod}
                    />
                    <span className="ml-2">Mpesa</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      onChange={handlePaymentMethod}
                    />
                    <span className="ml-2">Cash on Delivery</span>
                  </label>
                </div>
                {error.paymentMethod && (
                  <p className="text-red-500">{error.paymentMethod}</p>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Order Summary</h4>
                <ul className="space-y-2">
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x Ksh {item.price}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-bold">Total: Ksh {totalPrice}</p>
              </div>

              <button
                type="submit"
                className={`bg-blue-600 text-white px-4 py-2 rounded ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
