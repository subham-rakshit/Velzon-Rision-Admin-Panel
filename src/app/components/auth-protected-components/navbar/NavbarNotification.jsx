import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

// TODO Working on this file
const NavbarNotification = () => {
  return (
    <Dropdown
      label={
        <span className="relative p-[9px] rounded-full hover:bg-[#E6EEFD] transition-all duration-300 ease-in-out">
          <FaRegBell size={20} color="#878A99" />
          <span className="absolute -top-[7px] left-[50%] bg-[#F06548] text-white font-poppins-md font-semibold text-[10px] rounded-full px-[7px] py-[2px]">
            3
          </span>
        </span>
      }
      arrowIcon={false}
      inline
      dismissOnClick={false}
      className="w-full max-w-[320px] min-h-[415px]"
    >
      <Dropdown.Header className="flex items-center justify-between gap-2 bg-[#405189]">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="block font-poppins-rg font-semibold text-[15px] tracking-wide text-white">
            Notifications
          </span>
          <span className="flex items-center gap-1 bg-[#FEF4E4] text-[#F7B84B] px-2 py-1 rounded-[4px] text-[13px] tracking-wide font-[600]">
            {/* {cartData.length} items */}
          </span>
        </div>
      </Dropdown.Header>
      <div className={`flex flex-col w-full overflow-y-auto custom-scrollbar`}>
        {/* {cartData.map((item) => {
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
        })} */}
      </div>
      <Dropdown.Divider />
      <Dropdown.Item
        as="div"
        className="text-[16px] text-dark flex items-center justify-between"
      >
        <span className="font-poppins-rg">Total:</span>
        {/* <span>{`$${totalPrice}`}</span> */}
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

export default NavbarNotification;
