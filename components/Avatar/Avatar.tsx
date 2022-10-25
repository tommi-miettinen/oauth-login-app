type AvatarProps = {
  onClick?: () => any;
  displayLetter: string;
};

const Avatar = ({ onClick, displayLetter }: AvatarProps) => (
  <div
    onClick={onClick}
    className={`
      cursor-pointer h-[36px] w-[36px] rounded-full bg-[#4f46e5]
      font-bold flex items-center justify-center hover:bg-opacity-80
      `}
  >
    {displayLetter}
  </div>
);

export default Avatar;
