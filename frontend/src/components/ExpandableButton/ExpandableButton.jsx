const ExpandableButton = ({ isOpen, toggle }) => {
  return (
    <button onClick={() => toggle}>
      <span
        style={{
          transform: `rotate(${isOpen ? 180 : 0}deg)`,
          transition: "all 0.3s",
          backgroundColor: "gray",
          borderRadius: "50%",
        }}
        className="material-symbols-outlined"
      >
        expand_more
      </span>
    </button>
  );
};

export default ExpandableButton;
