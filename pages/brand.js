import Products from "@/components/Products";
import axios from "axios";
import { BASE_URL } from "../utils";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

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
          {sites.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ query: { brand } }) => {
  let response = await axios.get(`${BASE_URL}/api/products`);

  if (brand) {
    response = await axios.get(`${BASE_URL}/api/filter/${brand}`);
  }

  return {
    props: { sites: response.data },
  };
};
