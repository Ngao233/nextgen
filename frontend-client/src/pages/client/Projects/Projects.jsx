import { Link } from "react-router-dom";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";

const Projects = () => {
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
              <span className="sub-text">Các dự án của chúng tôi</span>
              <h1>Dự Án</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 project-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <h3 className="mb-0">
                <a href="#">Thiết kế căn hộ hiện đại</a>
              </h3>
              <span className="text-muted">Nội thất</span>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 project-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <h3 className="mb-0">
                <a href="#">Villa sang trọng</a>
              </h3>
              <span className="text-muted">Thiết kế</span>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 project-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_3.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <h3 className="mb-0">
                <a href="#">Văn phòng công ty</a>
              </h3>
              <span className="text-muted">Nội thất</span>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 project-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_4.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <h3 className="mb-0">
                <a href="#">Nhà hàng cao cấp</a>
              </h3>
              <span className="text-muted">Nội thất</span>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 project-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_5.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <h3 className="mb-0">
                <a href="#">Khách sạn boutique</a>
              </h3>
              <span className="text-muted">Thiết kế</span>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 project-entry">
              <a href="#" className="d-block figure">
                <img
                  src="/images/img_1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <h3 className="mb-0">
                <a href="#">Spa & Wellness</a>
              </h3>
              <span className="text-muted">Nội thất</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
