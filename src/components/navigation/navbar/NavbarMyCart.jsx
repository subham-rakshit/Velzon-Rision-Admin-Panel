"use client";

import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { RiShoppingBagLine } from "react-icons/ri";

import { myCartData } from "@/app/assets/navData/navData";

const NavbarMyCart = () => {
  const [cartData, setCartData] = useState(myCartData);
  const totalPrice = cartData.reduce((acc, curr) => {
    return acc + curr.productQuantity * curr.productPrice;
  }, 0);

  // return (
  //   <Dropdown
  //     label={
  //       <span
  //         className={`relative rounded-full border p-[5px] sm:p-[10px] transition-all duration-300 ease-in-out ${
  //           layoutModeType === "light"
  //             ? "nav-icons-hover-light"
  //             : "nav-icons-hover-dark"
  //         }`}
  //       >
  //         <RiShoppingBagLine size={20} className="icon-light450_dark350" />
  //         <span className="absolute left-1/2 top-[-7px] rounded-full bg-[#299CDB] px-[7px] py-[2px] font-poppins-md text-[10px] font-semibold text-white">
  //           {cartData.length}
  //         </span>
  //       </span>
  //     }
  //     arrowIcon={false}
  //     inline
  //     dismissOnClick={false}
  //     className="max-h-[460px] w-full max-w-[420px] focus:border-none"
  //   >
  //     <Dropdown.Header className="flex items-center justify-between gap-2">
  //       <span className="text-dark block font-poppins-md text-[15px] font-semibold tracking-wide">
  //         My Cart
  //       </span>
  //       <span className="flex items-center gap-1 rounded-[4px] bg-[#FEF4E4] px-2 py-1 text-[13px] font-[600] tracking-wide text-[#F7B84B]">
  //         {cartData.length} items
  //       </span>
  //     </Dropdown.Header>
  //     <div
  //       className={`flex flex-col ${
  //         cartData.length === 0
  //           ? "min-h-[200px] items-center justify-center"
  //           : "max-h-[300px]"
  //       } custom-scrollbar w-full overflow-y-auto`}
  //     >
  //       {cartData.length > 0 ? (
  //         cartData.map((item) => {
  //           // NOTE Handle deleting cart items
  //           const handleCartData = (e) => {
  //             e.stopPropagation(); // NOTE Preventing the parent handlers from being triggerd
  //             const newCartArray = cartData.filter(
  //               (product) => product.id !== item.id
  //             );

  //             setCartData(newCartArray);
  //           };

  //           return (
  //             <Dropdown.Item
  //               key={item.id}
  //               id={item.id}
  //               className={`flex items-center justify-between gap-2 hover:bg-[#f3f6f9]`}
  //               as="div"
  //             >
  //               <div className="flex items-center gap-4">
  //                 <Image
  //                   src={item.productImage}
  //                   alt={item.productName}
  //                   width={50}
  //                   height={50}
  //                   className="rounded-full bg-[#f3f6f9] p-2"
  //                 />
  //                 <span>
  //                   <span className="text-dark mb-2 block text-[14px] font-light tracking-wide">
  //                     {item.productName}
  //                   </span>
  //                   <span className="text-soft block text-[12px] font-light tracking-wide">
  //                     {`Quantity: ${item.productQuantity} x $${item.productPrice}`}
  //                   </span>
  //                 </span>
  //               </div>
  //               <span className="text-dark flex items-center gap-3 text-[16px] font-medium tracking-wide">
  //                 <span className="font-poppins-md">{`$${
  //                   item.productQuantity * item.productPrice
  //                 }`}</span>
  //                 <button
  //                   type="button"
  //                   onClick={handleCartData}
  //                   className="hover:scale-[1.3]"
  //                 >
  //                   <MdClose size={16} color="#407EF2" />
  //                 </button>
  //               </span>
  //             </Dropdown.Item>
  //           );
  //         })
  //       ) : (
  //         <div className="flex w-full flex-col items-center gap-4">
  //           <span className="rounded-full bg-[#DFF0FA] p-4">
  //             <PiShoppingCartSimpleBold size={40} color="#299CDB" />
  //           </span>
  //           <p className="text-dark text-[16px] font-medium">
  //             Your Cart is Empty!
  //           </p>
  //           <button
  //             type="button"
  //             className="rounded-[4px] bg-[#0ab39c] px-4 py-2 font-poppins-rg text-[13px] tracking-wide text-white hover:bg-[#099885]"
  //           >
  //             Shop Now
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //     <Dropdown.Divider />
  //     <Dropdown.Item
  //       as="div"
  //       className="text-dark flex items-center justify-between text-[16px]"
  //     >
  //       <span className="font-poppins-rg">Total:</span>
  //       <span>{`$${totalPrice}`}</span>
  //     </Dropdown.Item>{" "}
  //     <Dropdown.Item
  //       className="rounded-[5px] text-center text-[14px] font-medium"
  //       as="div"
  //     >
  //       {/* TODO Create redirect to checkout page  */}
  //       <button className="w-full rounded-[4px] bg-[#0ab39c] p-2 font-poppins-rg tracking-wide text-white hover:bg-[#099885]">
  //         Checkout
  //       </button>
  //     </Dropdown.Item>
  //   </Dropdown>
  // );
  return null;
};

export default NavbarMyCart;
