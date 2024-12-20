import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ImpostazioniProfilo from "./ImpostazioniProfilo";
import ProfiliSidebar from "./ProfiliSidebar";
import ProfiloSidebar from "./SidebarHomeSx";
import ProfiloSidebar2 from "./SidebarHomeSx2";
import SidebarHomeDx from "./SidebarHomeDx";
import { useLocation } from "react-router";
import { Col } from "react-bootstrap";

const Sidebar = (props) => {
  const location = useLocation();

  if (location.pathname === "/jobs") {
    return <></>;
  }

  if (
    props.type === "sx" &&
    (location.pathname === "/" || location.pathname === "/home")
  ) {
    return (
      <Col className="col-3">
        <ProfiloSidebar />
        <ProfiloSidebar2 />
      </Col>
    );
  }

  if (props.type === "dx" && location.pathname === "/") {
    return (
      <Col className="col-3">
        <SidebarHomeDx />
      </Col>
    );
  }

  if (props.type === "dx" && location.pathname === "/profile") {
    return (
      <Col className="col-3">
        <ImpostazioniProfilo />
        <ProfiliSidebar
          title="Altri Profili Per Te"
          profileNumber={3}
          type="perTe"
        />
        <ProfiliSidebar
          title="Profili Consigliati"
          profileNumber={10}
          type="consigliati"
        />
      </Col>
    );
  }
};

export default Sidebar;
