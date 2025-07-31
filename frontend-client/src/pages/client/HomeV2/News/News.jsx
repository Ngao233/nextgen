import React from "react";
import { Link } from "react-router-dom";

const News = () => {
  return (
    <div className="tw-bg-[#E0E0E0] tw-mt-[32px]">
      <div className="container tw-mx-auto tw-py-[48px]">
        <div className="tw-grid tw-grid-cols-3 tw-gap-[24px]">
          <div>
            <img
              src="/images/news-1.png"
              alt="Image 1"
              className="tw-block tw-w-full"
            />

            <p className="tw-text-[12px] tw-text-[#BDBDBD] tw-mt-[16px] tw-mb-[12px]">
              23, January 2019
            </p>

            <Link to="/news/1" className="tw-text-[#212121]">
              Architecture is ready to take the world to the next level
            </Link>
          </div>

          <div>
            <img
              src="/images/news-2.png"
              alt="Image 2"
              className="tw-block tw-w-full"
            />

            <p className="tw-text-[12px] tw-text-[#BDBDBD] tw-mt-[16px] tw-mb-[12px]">
              23, January 2019
            </p>

            <Link to="/news/1" className="tw-text-[#212121]">
              Architecture is ready to take the world to the next level
            </Link>
          </div>

          <div>
            <img
              src="/images/news-3.png"
              alt="Image 3"
              className="tw-block tw-w-full"
            />

            <p className="tw-text-[12px] tw-text-[#BDBDBD] tw-mt-[16px] tw-mb-[12px]">
              23, January 2019
            </p>

            <Link to="/news/1" className="tw-text-[#212121]">
              Architecture is ready to take the world to the next level
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
