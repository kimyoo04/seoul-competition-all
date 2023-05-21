import ReactDOM from "react-dom";

// HOC
const AlertPortal = (Component: React.FC) => () => {
  return ReactDOM.createPortal(
    <Component />,
    document.getElementById("alert") as HTMLElement
  );
};

export default AlertPortal;
