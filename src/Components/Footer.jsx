import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import { Network } from "lucide-react";

import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-blue-950 min-h-screen grid grid-cols-4 px-15 py-5">
      <div className="flex flex-col">
        <h2 className="text-[16px] text-white font-semibold">About Us</h2>
        <ul className="mt-2 text-[13px] text-gray-200 flex flex-col gap-2">
          <li>
            <a href="#">About LeadTree</a>
          </li>

          <li>
            <a href="#">Careers</a>
          </li>

          <li>
            <a href="#">Contact us</a>
          </li>
          <li>
            <a href="#">Investors</a>
          </li>
          <li>
            <a href="#">Partner with Us</a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col">
        <h2 className="text-[16px] text-white font-medium">Legal Information</h2>


        <ul className=" mt-2 text-[13px] text-slate-200 flex flex-col gap-2">
 <li>
            <a href="#">Overview</a>
          </li>

 <li>
            <a href="#">Privacy Policy</a>
          </li>
 <li>
            <a href="#">Terms of Use</a>
          </li>

 <li>
            <a href="#">Licenses & Disclosures</a>
          </li>


 <li>
            <a href="#">Unsubscribe</a>
          </li>
 <li>
            <a href="#">Accessibility Statement</a>
          </li>

        </ul>
      </div>


      <div className="flex flex-col">
 <h2 className="text-[16px] text-white font-medium">Other Sites</h2>

<ul className="mt-2 text-[13px] text-slate-200 flex flex-col gap-2">
    <li>
            <a href="#">CompareCards</a>
          </li>
 <li>
            <a href="#">DepositAccounts</a>
          </li>


 <li>
            <a href="#">ValuePenguin</a>
          </li>
<li>
    <a href="#">MagnifyMoney</a>
</li>

<li>
    <a href="#">SnapCap</a>
</li>

</ul>

      </div>

<div className="flex flex-col">
 <h2 className="text-[16px] text-white font-medium">Follow us</h2>

<ul className="mt-2 text-[13px] text-slate-200 flex flex-row gap-2">
    
    <li className="h-12 w-12 rounded-full border border-white flex items-center justify-center "><a href="#"><YouTube sx={{fontSize:"40px"}}/></a></li>



 <li className="h-12 w-12 rounded-full border border-white flex items-center justify-center "><a href="#"><Facebook sx={{fontSize:"40px"}} /></a></li>


<li className="h-12 w-12 rounded-full border border-white flex items-center justify-center "><a href="#"><Instagram sx={{fontSize:"40px"}} /></a></li>


<li className="h-12 w-12 rounded-full border border-white flex items-center justify-center "><a href="#"><Network size={"20px"}/></a></li>


</ul>

      </div>



<div className="flex px-10 py-5 w-xl">
<p className="text-gray-400 text-[13px]" >

LendingTree, LLC is a Marketing Lead Generator and is a Duly Licensed Mortgage Broker, as required by law, with its main office located at 1415 Vantage Park Drive, Suite 700, Charlotte, NC 28203 (TDD/TTY). NMLS Unique Identifier #1136. LendingTree, LLC is known as LT Technologies in lieu of true name LendingTree, LLC in NY. LendingTree technology and processes are patented under U.S. Patent Nos. 6,385,594 and 6,611,816 and licensed under U.S. Patent Nos. 5,995,947 and 5,758,328. © 2025 LendingTree, LLC. All Rights Reserved. This site is directed at, and made available to, persons in the continental U.S., Alaska and Hawaii only.



</p>
</div>



    </div>
  );
};

export default Footer;
