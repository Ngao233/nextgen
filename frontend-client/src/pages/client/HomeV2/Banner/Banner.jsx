import { Carousel } from "antd";
import React from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  const bannerImages = [
    {
      id: 1,
      src: "/images/banner-1.png",
      alt: "Banner 1",
    },
    {
      id: 2,
      src: "/images/banner-1.png",
      alt: "Banner 2",
    },
    {
      id: 3,
      src: "/images/banner-1.png",
      alt: "Banner 3",
    },
    {
      id: 4,
      src: "/images/banner-1.png",
      alt: "Banner 4",
    },
  ];

  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    infinite: true,
    speed: 500,
    pauseOnHover: true,
    draggable: true,
  };

  return (
    <div className={styles.bannerContainer}>
      <Carousel {...carouselSettings} className={styles.carousel}>
        {bannerImages.map((banner) => (
          <div key={banner.id} className={styles.slideItem}>
            <div
              className={styles.slideImage}
              style={{ backgroundImage: `url(${banner.src})` }}
            ></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
