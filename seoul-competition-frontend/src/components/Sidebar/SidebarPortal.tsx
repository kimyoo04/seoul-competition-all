import ReactDOM from "react-dom";

// HOC
const SidebarPortal = (Component: React.FunctionComponent) => () => {
  return ReactDOM.createPortal(
    <Component />,
    document.getElementById("sidebar") as HTMLElement
  );
};

export default SidebarPortal;
