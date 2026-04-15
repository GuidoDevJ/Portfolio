import style from "./styles.module.css";

interface BlobProps {
  imageSrc?: string;
  alt?: string;
}

const Blob = ({ imageSrc, alt = "Profile" }: BlobProps) => {
  return (
    <div className={style.container}>
      <div className={style.animated_blob_image}>
        {imageSrc ? (
          <img src={imageSrc} alt={alt} />
        ) : (
          <div className={style.placeholder}>
            <span>GG</span>
          </div>
        )}
      </div>
    </div>
  );
};

export { Blob };
