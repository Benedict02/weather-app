const Banner = ({ src, caption }) => {
  return (
    <div className="black-bg">
      <div className="banner">
        <video autoPlay muted loop>
          <source src={src} type="video/mp4" />
        </video>
        <div className="caption">
          <div id="title">{caption}</div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
