"use client";

import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { RiShoppingBagLine } from "react-icons/ri";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { myCartData } from "@/app/assets/data/navData/navData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";

const NavbarMyCart = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const [cartData, setCartData] = useState(myCartData);
  const totalPrice = cartData.reduce((acc, curr) => {
    return acc + curr.productQuantity * curr.productPrice;
  }, 0);

  const handleCartData = (e, item) => {
    e.stopPropagation();
    const newCartArray = cartData.filter((product) => product.id !== item.id);

    setCartData(newCartArray);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`${globalStyleObj.flexCenter} ${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} relative m-0 size-[30px] rounded-full p-0 sm:size-[40px]`}
        >
          <RiShoppingBagLine
            size={20}
            className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
          />
          <span
            className={`${globalStyleObj.flexCenter} absolute left-1/2 top-[-8px] rounded-full bg-[#299CDB] px-[5px] font-poppins-md text-[10px] font-semibold text-white sm:top-[-5px]`}
          >
            {cartData.length}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={`${globalStyleObj.backgroundLight900Dark200} max-h-[460px] w-screen gap-2 border-none sm:max-w-[420px]`}
      >
        <DropdownMenuLabel className={`${globalStyleObj.flexBetween}`}>
          <span className={`${globalStyleObj.text16Light550Dark550}`}>
            My Cart
          </span>
          <span
            className={`gap-1 rounded-[4px] bg-custom-yellow-100 px-2 py-1 font-poppins-rg text-[11px] tracking-wider text-accent-light-yellow dark:bg-custom-yellow-400`}
          >
            {cartData.length} items
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup
          className={`flex flex-col gap-2 ${
            cartData.length === 0
              ? "min-h-[200px] items-center justify-center"
              : "max-h-[300px]"
          } custom-scrollbar w-full overflow-y-auto`}
        >
          {cartData.length > 0 ? (
            cartData.map((item) => {
              return (
                <DropdownMenuItem
                  key={item.id}
                  id={item.id}
                  className={`${globalStyleObj.flexBetween} gap-2`}
                  as="div"
                >
                  <div className={`${globalStyleObj.flexStart} gap-4`}>
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={50}
                      height={50}
                      className="rounded-full bg-light-dencity-800 p-2 dark:bg-dark-dencity-300"
                    />
                    <span>
                      <span
                        className={`${globalStyleObj.text13Light550Dark550} mb-1 block`}
                      >
                        {item.productName}
                      </span>
                      <span
                        className={`${globalStyleObj.text11Light400} block`}
                      >
                        {`Quantity: ${item.productQuantity} x $${item.productPrice}`}
                      </span>
                    </span>
                  </div>
                  <span
                    className={`${globalStyleObj.flexStart} ${globalStyleObj.text16Light550Dark550} gap-3`}
                  >
                    <span className="font-poppins-md">{`$${
                      item.productQuantity * item.productPrice
                    }`}</span>
                    <button
                      type="button"
                      onClick={(e) => handleCartData(e, item)}
                      className="hover:scale-[1.3]"
                    >
                      <MdClose size={16} color="#407EF2" />
                    </button>
                  </span>
                </DropdownMenuItem>
              );
            })
          ) : (
            <DropdownMenuItem
              className={`${globalStyleObj.flexColCenter} w-full gap-4`}
            >
              <span className="rounded-full bg-custom-blue-200 p-5 dark:bg-custom-blue-400">
                <PiShoppingCartSimpleBold size={35} color="#299CDB" />
              </span>
              <p className={`${globalStyleObj.text16Light550Dark550}`}>
                Your Cart is Empty!
              </p>
              <button
                type="button"
                className="rounded-[4px] bg-custom-green-400 px-5 py-2 font-poppins-rg text-[13px] tracking-wide text-white hover:bg-custom-green-500"
              >
                Shop Now
              </button>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            as="div"
            className={`${globalStyleObj.flexBetween} ${globalStyleObj.text16Light550Dark550}`}
          >
            <span className="text-light-weight-400">Total:</span>
            <span>{`$${totalPrice}`}</span>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem
            className="rounded-[5px] text-center text-[14px] font-medium"
            as="div"
          >
            <button className="w-full rounded-[4px] bg-custom-green-400 p-2 font-poppins-rg tracking-wide text-white hover:bg-custom-green-500">
              Checkout
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMyCart;
