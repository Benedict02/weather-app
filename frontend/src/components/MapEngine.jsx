const MapEngine = (lat, long) => {
  const src = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${long}#map=12/${lat}/${long}&layers=N`;
  return (
    <>
      <iframe
        title="OpenStreetMap"
        width="600"
        height="450"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={src}
      ></iframe>
    </>
  );
};

export default MapEngine;
