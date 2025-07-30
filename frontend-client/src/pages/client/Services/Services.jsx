import ClientHeader from "../../../layouts/MainLayout/ClientHeader";

const Services = () => {
  return (
    <>
      <ClientHeader />

      {/* Hero Section */}
      <div
        className="site-blocks-cover overlay inner-page"
        style={{ backgroundImage: "url(/images/hero_bg_1.jpg)" }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-10">
              <span className="sub-text">Dịch vụ tuyệt vời của chúng tôi</span>
              <h1>Dịch Vụ</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="media custom-media">
                <div className="mr-3 icon">
                  <span className="flaticon-interior-design display-4"></span>
                </div>
                <div className="media-body">
                  <h5 className="mt-0">Giải pháp sáng tạo</h5>
                  Chúng tôi cung cấp những giải pháp thiết kế độc đáo và sáng
                  tạo, phù hợp với nhu cầu và phong cách sống của từng khách
                  hàng.
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="media custom-media">
                <div className="mr-3 icon">
                  <span className="flaticon-step-ladder display-4"></span>
                </div>
                <div className="media-body">
                  <h5 className="mt-0">Thiết kế nội thất</h5>
                  Dịch vụ thiết kế nội thất hoàn chỉnh từ concept đến thi công,
                  đảm bảo chất lượng và tiến độ theo cam kết.
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="media custom-media">
                <div className="mr-3 icon">
                  <span className="flaticon-turned-off display-4"></span>
                </div>
                <div className="media-body">
                  <h5 className="mt-0">Thiết kế thông minh</h5>
                  Ứng dụng công nghệ smart home và tối ưu hóa không gian để tạo
                  ra môi trường sống tiện nghi và hiện đại.
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="media custom-media">
                <div className="mr-3 icon">
                  <span className="flaticon-window display-4"></span>
                </div>
                <div className="media-body">
                  <h5 className="mt-0">Tư vấn kiến trúc</h5>
                  Đội ngũ kiến trúc sư giàu kinh nghiệm tư vấn và thiết kế kiến
                  trúc nội thất phù hợp với từng không gian.
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="media custom-media">
                <div className="mr-3 icon">
                  <span className="flaticon-measuring display-4"></span>
                </div>
                <div className="media-body">
                  <h5 className="mt-0">Quản lý dự án</h5>
                  Quản lý toàn bộ dự án từ khâu thiết kế đến thi công, đảm bảo
                  tiến độ và chất lượng theo yêu cầu khách hàng.
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="media custom-media">
                <div className="mr-3 icon">
                  <span className="flaticon-sit-down display-4"></span>
                </div>
                <div className="media-body">
                  <h5 className="mt-0">Bảo hành & Bảo trì</h5>
                  Dịch vụ bảo hành và bảo trì sau bàn giao, đảm bảo chất lượng
                  công trình luôn được duy trì ở mức tốt nhất.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="site-section site-block-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="img-border">
                <img
                  src="/images/img_5.jpg"
                  alt="NextGen Services"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row row-items">
                <div className="col-6">
                  <a
                    href="#"
                    className="d-flex text-center feature active p-4 mb-4 bg-white"
                  >
                    <span className="align-self-center w-100">
                      <span className="d-block mb-3">
                        <span className="flaticon-step-ladder display-3"></span>
                      </span>
                      <h3>Thiết kế hồ bơi</h3>
                    </span>
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="#"
                    className="d-flex text-center feature active p-4 mb-4 bg-white"
                  >
                    <span className="align-self-center w-100">
                      <span className="d-block mb-3">
                        <span className="flaticon-sit-down display-3"></span>
                      </span>
                      <h3>Nội thất ghế ngồi</h3>
                    </span>
                  </a>
                </div>
              </div>
              <div className="row row-items last">
                <div className="col-6">
                  <a
                    href="#"
                    className="d-flex text-center feature active p-4 mb-4 bg-white"
                  >
                    <span className="align-self-center w-100">
                      <span className="d-block mb-3">
                        <span className="flaticon-turned-off display-3"></span>
                      </span>
                      <h3>Ý tưởng thông minh</h3>
                    </span>
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="#"
                    className="d-flex text-center active feature active p-4 mb-4 bg-white"
                  >
                    <span className="align-self-center w-100">
                      <span className="d-block mb-3">
                        <span className="flaticon-window display-3"></span>
                      </span>
                      <h3>Trang trí</h3>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
