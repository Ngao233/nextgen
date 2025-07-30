import { useEffect } from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";

const Contact = () => {
  useEffect(() => {
    // Initialize carousel for testimonials
    if (window.jQuery && window.jQuery.fn.owlCarousel) {
      window.jQuery(".nonloop-block-13").owlCarousel({
        center: false,
        items: 1,
        loop: false,
        stagePadding: 0,
        margin: 20,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">',
        ],
        responsive: {
          600: {
            margin: 20,
            items: 2,
          },
          1000: {
            margin: 20,
            items: 3,
          },
        },
      });
    }
  }, []);

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
              <span className="sub-text">Liên hệ với chúng tôi</span>
              <h1>Liên Hệ</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <h2 className="site-heading text-black mb-5">
                Nói <strong>Xin chào</strong>
              </h2>

              <form action="#" className="p-5 bg-white">
                <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      className="form-control"
                      placeholder="Họ và tên đầy đủ"
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="font-weight-bold" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Địa chỉ email"
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="font-weight-bold" htmlFor="phone">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="font-weight-bold" htmlFor="message">
                      Tin nhắn
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="5"
                      className="form-control"
                      placeholder="Hãy chia sẻ với chúng tôi về dự án của bạn"
                    ></textarea>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      value="Gửi tin nhắn"
                      className="btn btn-primary rounded-0 btn-lg"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container site-section block-13 testimonial-wrap">
        <div className="row">
          <div className="col-12 text-center">
            <span className="sub-title">Khách hàng hài lòng</span>
            <h2 className="font-weight-bold text-black mb-5">Testimonials</h2>
          </div>
        </div>

        <div className="nonloop-block-13 owl-carousel">
          <div className="testimony">
            <img src="/images/person_1.jpg" alt="Image" className="img-fluid" />
            <h3>Cloe Marena</h3>
            <span className="sub-title">Chủ sở hữu công ty xây dựng</span>
            <p>
              &ldquo;
              <em>
                NextGen đã thiết kế lại văn phòng của chúng tôi một cách tuyệt
                vời. Không gian làm việc trở nên hiện đại và thoải mái hơn rất
                nhiều.
              </em>
              &rdquo;
            </p>
          </div>

          <div className="testimony">
            <img src="/images/person_2.jpg" alt="Image" className="img-fluid" />
            <h3>Nathalie Channie</h3>
            <span className="sub-title">Giám đốc khách sạn</span>
            <p>
              &ldquo;
              <em>
                Dịch vụ thiết kế nội thất khách sạn của NextGen thật sự ấn
                tượng. Khách hàng của chúng tôi đều rất hài lòng với không gian
                mới.
              </em>
              &rdquo;
            </p>
          </div>

          <div className="testimony">
            <img src="/images/person_3.jpg" alt="Image" className="img-fluid" />
            <h3>Will Turner</h3>
            <span className="sub-title">Chủ nhà hàng</span>
            <p>
              &ldquo;
              <em>
                Nhà hàng của tôi đã được NextGen thiết kế lại hoàn toàn. Doanh
                thu tăng đáng kể nhờ không gian ấm cúng và sang trọng.
              </em>
              &rdquo;
            </p>
          </div>

          <div className="testimony">
            <img src="/images/person_4.jpg" alt="Image" className="img-fluid" />
            <h3>Nicolas Stainer</h3>
            <span className="sub-title">Chủ căn hộ</span>
            <p>
              &ldquo;
              <em>
                Căn hộ của gia đình tôi được NextGen thiết kế với phong cách
                hiện đại, tối ưu hóa không gian một cách thông minh.
              </em>
              &rdquo;
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
