import { useEffect, useMemo, useState } from "react";
import { Alert, Table, Tag, Tooltip, Typography } from "antd";

import { useAuth } from "../hooks/use-auth";
import axios from "../utils/axios";
import { useHistory } from "react-router-dom";

function UsersList() {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const history = useHistory();
  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "uniqid", key: "uniqid" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Password", dataIndex: "password", key: "password" },
      {
        title: "Phones",
        dataIndex: "phones",
        key: "phones",
        render: (phones) => (
          <div>
            {phones.map((phone) => (
              <div style={{ marginBottom: 2 }}>
                <Tooltip title="Código país">
                  <Tag color="orange" key={phone.countryCode}>
                    {phone.countryCode}
                  </Tag>
                </Tooltip>
                <Tooltip title="Código ciudad">
                  <Tag color="green" key={phone.cityCode}>
                    {phone.cityCode}
                  </Tag>
                </Tooltip>
                <Tooltip title="Número de Teléfono">
                  <Tag color="blue" key={phone.number}>
                    {phone.number}
                  </Tag>
                </Tooltip>
              </div>
            ))}
          </div>
        ),
      },
    ],
    []
  );
  const { currentUser } = useAuth();
  const url = "/users/all";

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setError(null);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${currentUser().token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        const res = error.response.data;
        if (res.codigo === "EXPIRED_SESSION") {
          history.push("/auth/login");
        } else {
          setError("Ha ocurrido un error, inténtelo más tarde.");
        }
      });
  };

  return (
    <div className="App">
      <Typography.Title level={2}>Lista de Usuarios Activos</Typography.Title>
      {error && (
        <Alert className="users-list-alert" message={error} type="error" />
      )}
      {users && <Table dataSource={users} columns={columns} />}
    </div>
  );
}

export default UsersList;
