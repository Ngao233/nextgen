import ClientHeader from "../../../layouts/MainLayout/ClientHeader";

const About = () => {
  return (
    <>
      <ClientHeader />

      {/* Hero Section */}
      <div
        className="site-blocks-cover overlay"
        style={{ backgroundImage: "url(/images/hero_bg_1.jpg)" }}
      >
        <div className="container">
          <div className="row align-items-center text-center justify-content-center">
            <div className="col-md-8">
              <span className="sub-text">About Us</span>
              <h1>Learn More About NextGen</h1>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="img-border">
                <img
                  src="/images/about_1.png"
                  alt="About NextGen"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <span className="sub-title">Our Story</span>
              <h2 className="font-weight-bold text-black mb-4">
                About NextGen Interior Design
              </h2>
              <p>
                NextGen Interior Design là công ty thiết kế nội thất hàng đầu
                với nhiều năm kinh nghiệm trong việc tạo ra những không gian
                sống và làm việc độc đáo, hiện đại.
              </p>
              <p>
                Chúng tôi chuyên về thiết kế nội thất cao cấp, tư vấn kiến trúc
                và cung cấp giải pháp hoàn chỉnh cho mọi dự án từ nhỏ đến lớn.
              </p>

              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="media custom-media">
                    <div className="mr-3 icon">
                      <span className="flaticon-interior-design display-4"></span>
                    </div>
                    <div className="media-body">
                      <h5 className="mt-0">Thiết kế sáng tạo</h5>
                      <p>Đội ngũ thiết kế giàu kinh nghiệm và sáng tạo</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media custom-media">
                    <div className="mr-3 icon">
                      <span className="flaticon-measuring display-4"></span>
                    </div>
                    <div className="media-body">
                      <h5 className="mt-0">Chất lượng cao</h5>
                      <p>Cam kết chất lượng và sự hài lòng của khách hàng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <span className="sub-title">Đội ngũ</span>
              <h2 className="font-weight-bold text-black">
                Gặp gỡ đội ngũ chuyên gia
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="testimony text-center">
                <img
                  src="/images/person_1.jpg"
                  alt="Team Member"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h3 className="mt-3">Nguyễn Văn A</h3>
                <span className="sub-title">Giám đốc thiết kế</span>
                <p>
                  10+ năm kinh nghiệm trong lĩnh vực thiết kế nội thất cao cấp.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="testimony text-center">
                <img
                  src="/images/person_2.jpg"
                  alt="Team Member"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h3 className="mt-3">Trần Thị B</h3>
                <span className="sub-title">Kiến trúc sư trưởng</span>
                <p>
                  Chuyên gia về kiến trúc nội thất và không gian sống hiện đại.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="testimony text-center">
                <img
                  src="/images/person_3.jpg"
                  alt="Team Member"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h3 className="mt-3">Lê Văn C</h3>
                <span className="sub-title">Quản lý dự án</span>
                <p>
                  Đảm bảo mọi dự án được hoàn thành đúng tiến độ và chất lượng.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="testimony text-center">
                <img
                  src="/images/person_4.jpg"
                  alt="Team Member"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h3 className="mt-3">Phạm Thị D</h3>
                <span className="sub-title">Tư vấn khách hàng</span>
                <p>
                  Hỗ trợ khách hàng từ ý tưởng ban đầu đến hoàn thiện dự án.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
