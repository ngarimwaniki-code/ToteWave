import '../../assets/styles/ui.css';

export const Carousel = ({ children }) => {
  return (
    <div className="carousel">
      <div className="carousel-content">
        {children}
      </div>
    </div>
  );
};

export const CarouselContent = ({ children }) => {
  return <div className="carousel-content">{children}</div>;
};

export const CarouselItem = ({ children }) => {
  return <div className="carousel-item">{children}</div>;
};

export const CarouselPrevious = ({ onClick }) => {
  return (
    <button className="carousel-previous" onClick={onClick}>
      &#8249;
    </button>
  );
};

export const CarouselNext = ({ onClick }) => {
  return (
    <button className="carousel-next" onClick={onClick}>
      &#8250;
    </button>
  );
};