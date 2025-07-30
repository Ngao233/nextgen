import ClientHeader from "../../../layouts/MainLayout/ClientHeader";

const News = () => {
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
              <span className="sub-text">Cập nhật</span>
              <h1>Tin Tức &amp; Blogs</h1>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-4 col-md-6 mb-5 post-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <span className="text-muted d-block mb-1">23 Tháng 6, 2024</span>
              <h3>
                <a href="#">
                  Xu hướng thiết kế nội thất 2024: Minimalism và Sustainability
                </a>
              </h3>
            </div>
            <div className="col-lg-4 col-md-6 mb-5 post-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <span className="text-muted d-block mb-1">20 Tháng 6, 2024</span>
              <h3>
                <a href="#">
                  Cách tối ưu hóa không gian nhỏ với thiết kế thông minh
                </a>
              </h3>
            </div>
            <div className="col-lg-4 col-md-6 mb-5 post-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_3.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <span className="text-muted d-block mb-1">18 Tháng 6, 2024</span>
              <h3>
                <a href="#">
                  Màu sắc và ánh sáng: Bí quyết tạo không gian sống ấm cúng
                </a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 mb-5 post-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_4.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <span className="text-muted d-block mb-1">15 Tháng 6, 2024</span>
              <h3>
                <a href="#">
                  Thiết kế văn phòng hiện đại: Productivity meets Aesthetics
                </a>
              </h3>
            </div>
            <div className="col-lg-4 col-md-6 mb-5 post-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_5.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <span className="text-muted d-block mb-1">12 Tháng 6, 2024</span>
              <h3>
                <a href="#">
                  Smart Home Integration: Công nghệ trong thiết kế nội thất
                </a>
              </h3>
            </div>
            <div className="col-lg-4 col-md-6 mb-5 post-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <span className="text-muted d-block mb-1">10 Tháng 6, 2024</span>
              <h3>
                <a href="#">
                  Kinh nghiệm lựa chọn nội thất cho căn hộ chung cư
                </a>
              </h3>
            </div>
          </div>

          {/* Pagination */}
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="site-block-27">
                <ul>
                  <li>
                    <a href="#">&lt;</a>
                  </li>
                  <li className="active">
                    <span>1</span>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>
                    <a href="#">4</a>
                  </li>
                  <li>
                    <a href="#">5</a>
                  </li>
                  <li>
                    <a href="#">&gt;</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
