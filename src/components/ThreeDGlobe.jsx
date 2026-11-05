import earthImage from '../assets/earth-reference.png';

export default function ThreeDGlobe({ className = '' }) {
  return (
    <div className={`globe reference-earth ${className}`} aria-hidden="true">
      <span className="reference-orbit orbit-a" />
      <span className="reference-orbit orbit-b" />
      <span className="orbit-dot dot-a" />
      <span className="orbit-dot dot-b" />
      <img
        className="reference-earth-image"
        src={earthImage}
        alt=""
        draggable="false"
      />
    </div>
  );
}
