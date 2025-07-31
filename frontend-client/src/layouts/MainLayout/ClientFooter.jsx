import { Link } from "react-router-dom";

const ClientFooter = () => {
  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="row mb-5">
              <div className="col-md-12">
                <h3 className="footer-heading mb-4">Navigation</h3>
              </div>
              <div className="col-md-6 col-lg-6">
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/news">News</Link>
                  </li>
                  <li>
                    <a href="#">Team</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-6">
                <ul className="list-unstyled">
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <a href="#">Membership</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-5">
              <h3 className="footer-heading mb-4">Recent News</h3>
              <div className="block-25">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a href="#" className="d-flex">
                      <figure className="image mr-4">
                        <img
                          src="/images/hero_bg_1.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </figure>
                      <div className="text">
                        <span className="small text-uppercase date">
                          Sep 16, 2018
                        </span>
                        <h3 className="heading font-weight-light">
                          Lorem ipsum dolor sit amet consectetur elit
                        </h3>
                      </div>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#" className="d-flex">
                      <figure className="image mr-4">
                        <img
                          src="/images/hero_bg_1.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </figure>
                      <div className="text">
                        <span className="small text-uppercase date">
                          Sep 16, 2018
                        </span>
                        <h3 className="heading font-weight-light">
                          Lorem ipsum dolor sit amet consectetur elit
                        </h3>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="mb-5">
              <h3 className="footer-heading mb-2">Subscribe Newsletter</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit minima
                minus odio.
              </p>
              <form action="#" method="post">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control border-white text-white bg-transparent"
                    placeholder="Enter Email"
                    aria-label="Enter Email"
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="button-addon2"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h3 className="footer-heading mb-4">Follow Us</h3>
                <div>
                  <a href="#" className="pl-0 pr-3">
                    <span className="icon-facebook"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-twitter"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-instagram"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-linkedin"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <p>
              Copyright &copy; {new Date().getFullYear()} All rights reserved |
              NextGen Interior Design
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;
