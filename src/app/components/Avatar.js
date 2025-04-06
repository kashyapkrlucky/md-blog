import clsx from "clsx";
import Image from "next/image";

const Avatar = ({
  user = { name: "User", fullName: "User Avatar", avatar: "" },
  size = "md",
  alt = "User Avatar",
  className = "",
}) => {
  const sizeStyles = {
    sm: "h-6 w-6 text-sm",
    md: "h-10 w-10 text-lg",
    lg: "h-14 w-14 text-xl",
    xl: "h-20 w-20 text-2xl",
  };

  const isImageFile = (filename) =>
    /\.(png|jpg|jpeg|gif|webp)$/i.test(filename);
  const avatarFile = user?.avatar || user?.photo;
  const avatarSrc = avatarFile
    ? isImageFile(avatarFile)
      ? `/avatars/${avatarFile}`
      : avatarFile
    : "";
  const displayName = user?.name || user?.fullName || "?";

  return (
    <div className={clsx("relative inline-block", className)}>
      {avatarSrc ? (
        <Image
          className={clsx(
            "rounded-full object-cover shadow-md",
            sizeStyles[size]
          )}
          src={avatarSrc}
          alt={alt}
        />
      ) : (
        <div
          className={clsx(
            "rounded-full flex items-center justify-center bg-gray-100 text-gray-800 shadow-md font-semibold border-2 border-gray-300",
            sizeStyles[size]
          )}
        >
          {displayName[0].toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
