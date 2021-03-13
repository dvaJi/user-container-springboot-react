import { Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const DashboardItem = ({ icon, title, to }) => {
  return (
    <Link to={to}>
      <div class="dashboard-item">
        <div class="dashboard-item-content">
          <div class="icon">
            <Icon type={icon} />
          </div>
          <div class="title">{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardItem;
