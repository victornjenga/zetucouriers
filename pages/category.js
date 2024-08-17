import Products from "@/components/Products";
import axios from "axios";
import { BASE_URL } from "../utils";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import Brands from "@/sections/Brands";

const Home = ({ sites }) => {
  // console.log(sites)
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="pt-56 ">
        <div className="flex pt-2 flex-wrap  w-full">
        <div className="w-full items-center justify-center flex ">
          <Brands/>
        </div>
          {sites.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ query: { category } }) => {
  let response = await axios.get(`${BASE_URL}/api/products`);

  if (category) {
    response = `*[_type == "sites" && "${category}" in categories[]->title]{
      _id,
      name,
      image,
      price,
      description,
      brand
    }`
  }
  return {
    props: { sites: response.data },
  };
};
