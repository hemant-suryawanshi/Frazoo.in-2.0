import { Box, Button, Toast, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "./ProductList.css";
import { FaCartPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ProductList = () => {
  const { query } = useParams();
  const toast = useToast();
  const products = useSelector((store) => store.Product.Products);

  const HandelCart = (ele) => {
    console.log(ele);
    toast({
      title: "Successfull",
      description: `${ele.name} Added to the cart`,
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
    const cart = JSON.parse(localStorage.getItem("FraazoCart")) || [];
    cart.push(ele);
    localStorage.setItem("FraazoCart", JSON.stringify(cart));
  };

  return (
    <Box id="mainContainer">
      <Box id="container1">
        {products.map((ele) => (
          <Box id="container11">
            <Link to={`/product/${query}/${ele.name}/${ele._id}`}>
              <Box id="imgbox">
                <img src={ele.image} />
              </Box>
            </Link>
            <Box id="textBox">
              <p id="name">
                {ele.name.slice(0, 26)}
                {ele.name.length > 26 && "..."}
              </p>
              <Box id="lowerbox">
                <Box id="leftbox">
                  <p id="qty">{ele.quantity}</p>
                  <p id="price">₹{ele.price}</p>
                </Box>
                <Box id="rightbox">
                  <Button
                    colorScheme="green"
                    variant="outline"
                    height={"35px"}
                    id="cartbutton"
                    rounded={"full"}
                    onClick={() => HandelCart(ele)}
                  >
                    <FaCartPlus />
                    Add
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
