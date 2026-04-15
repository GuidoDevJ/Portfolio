interface BurgerIconProps {
  action: () => void;
}

const BurgerIcon = ({ action }: BurgerIconProps) => {
  return (
    <img
      src="/assets/Burger.svg"
      width="50px"
      alt="Menu"
      onClick={action}
      style={{ cursor: "pointer" }}
    />
  );
};

export { BurgerIcon };
