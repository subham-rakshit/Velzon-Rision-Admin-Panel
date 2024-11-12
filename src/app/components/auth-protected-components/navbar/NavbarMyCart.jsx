import { Button, Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdClose } from "react-icons/md";
import { RiShoppingBagLine } from "react-icons/ri";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

const NavbarMyCart = ({ cartData, setCartData }) => {
  const totalPrice = cartData.reduce((acc, curr) => {
    return acc + curr.productQuantity * curr.productPrice;
  }, 0);

  return (
    <Dropdown
      label={
        <span className="relative p-[9px] rounded-full hover:bg-[#E6EEFD] transition-all duration-300 ease-in-out">
          <RiShoppingBagLine size={20} color="#878A99" />
          <span className="absolute -top-[7px] left-[50%] bg-[#299CDB] text-white font-poppins-md font-semibold text-[10px] rounded-full px-[7px] py-[2px]">
            {cartData.length}
          </span>
        </span>
      }
      arrowIcon={false}
      inline
      dismissOnClick={false}
      className="w-full max-w-[420px] max-h-[460px] focus:border-none"
    >
      <Dropdown.Header className="flex items-center justify-between gap-2">
        <span className="block text-dark font-poppins-md font-semibold text-[15px] tracking-wide">
          My Cart
        </span>
        <span className="flex items-center gap-1 bg-[#FEF4E4] text-[#F7B84B] px-2 py-1 rounded-[4px] text-[13px] tracking-wide font-[600]">
          {cartData.length} items
        </span>
      </Dropdown.Header>
      <div
        className={`flex flex-col ${
          cartData.length === 0
            ? "items-center justify-center min-h-[200px]"
            : "max-h-[300px]"
        } w-full overflow-y-auto custom-scrollbar`}
      >
        {cartData.length > 0 ? (
          cartData.map((item) => {
            //NOTE Handle deleting cart items
            const handleCartData = (e) => {
              e.stopPropagation(); // NOTE Preventing the parent handlers from being triggerd
              const newCartArray = cartData.filter(
                (product) => product.id !== item.id
              );

              setCartData(newCartArray);
            };

            return (
              <Dropdown.Item
                key={item.id}
                id={item.id}
                className={`flex items-center justify-between gap-2 hover:bg-[#f3f6f9]`}
                as="div"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={50}
                    height={50}
                    className="bg-[#f3f6f9] rounded-full p-2"
                  />
                  <span>
                    <span className="block text-dark font-light text-[14px] tracking-wide mb-2">
                      {item.productName}
                    </span>
                    <span className="block text-soft font-light text-[12px] tracking-wide">
                      {`Quantity: ${item.productQuantity} x $${item.productPrice}`}
                    </span>
                  </span>
                </div>
                <span className="text-drak font-medium text-[16px] tracking-wide flex items-center gap-3">
                  <span className="font-poppins-md">{`$${
                    item.productQuantity * item.productPrice
                  }`}</span>
                  <button
                    type="button"
                    onClick={handleCartData}
                    className="hover:scale-[1.3]"
                  >
                    <MdClose size={16} color="#407EF2" />
                  </button>
                </span>
              </Dropdown.Item>
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-4 w-full">
            <span className="bg-[#DFF0FA] p-4 rounded-full">
              <PiShoppingCartSimpleBold size={40} color="#299CDB" />
            </span>
            <p className="text-dark text-[16px] font-medium">
              Your Cart is Empty!
            </p>
            <button
              type="button"
              className="text-white text-[13px] tracking-wide font-poppins-rg bg-[#0ab39c] hover:bg-[#099885] px-4 py-2 rounded-[4px]"
            >
              Shop Now
            </button>
          </div>
        )}
      </div>
      <Dropdown.Divider />
      <Dropdown.Item
        as="div"
        className="text-[16px] text-dark flex items-center justify-between"
      >
        <span className="font-poppins-rg">Total:</span>
        <span>{`$${totalPrice}`}</span>
      </Dropdown.Item>{" "}
      <Dropdown.Item
        className="text-[14px] font-medium text-center rounded-[5px]"
        as="div"
      >
        {/* TODO Create redirect to checkout page  */}
        <button className="text-white tracking-wide font-poppins-rg bg-[#0ab39c] hover:bg-[#099885] w-full px-2 py-2 rounded-[4px]">
          Checkout
        </button>
      </Dropdown.Item>
    </Dropdown>
  );
};

export default NavbarMyCart;
