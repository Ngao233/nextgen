import React from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import Banner from "./Banner/Banner";
import CouponList from "./CouponList/CouponList";
import CategoryList from "./CategoryList/CategoryList";
import SectionContent from "./SectionContent/SectionContent";
import ProductLatest from "./ProductLatest/ProductLatest";
import BestSelling from "./BestSelling/BestSelling";
import News from "./News/News";
import SectionContent2 from "./SectionContent2/SectionContent2";

const HomeV2 = () => {
  return (
    <>
      <ClientHeader lightMode={false} />

      <main className="tw-pt-[100px]">
        <Banner />
        <CouponList />
        <CategoryList />
        <SectionContent />
        <ProductLatest />
        <BestSelling />
        <News />
        <SectionContent2 />
      </main>
    </>
  );
};

export default HomeV2;
