import React from "react";

const SectionContent = () => {
  return (
    <div className="tw-bg-[#E0E0E0] tw-mt-[32px]">
      <div className="container tw-mx-auto tw-py-[48px]">
        <div className="tw-grid tw-grid-cols-2 tw-gap-[24px]">
          <div className="tw-col-span-1">
            <img src="/images/image-1.png" alt="Image 1" className="tw-block" />
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-gap-[24px] tw-cols-span-1">
            <img src="/images/image-2.png" alt="Image 2" />
            <img src="/images/image-3.png" alt="Image 3" />
            <img src="/images/image-4.png" alt="Image 4" />
            <img src="/images/image-5.png" alt="Image 5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
