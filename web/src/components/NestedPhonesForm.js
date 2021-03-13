import { Button, Icon, Input } from "antd";
import React from "react";
import { useFieldArray, Controller } from "react-hook-form";

const NestedPhonesForm = ({ control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "phones",
  });

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            {index > 0 && <hr />}
            <Controller
              as={
                <Input
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Número"
                />
              }
              name={`phones[${index}].number`}
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            <Controller
              as={
                <Input
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Código ciudad"
                />
              }
              name={`phones[${index}].cityCode`}
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            <Controller
              as={
                <Input
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Código país"
                />
              }
              name={`phones[${index}].countryCode`}
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            <Button type="button" onClick={() => remove(index)}>
              Borrar teléfono
            </Button>
          </div>
        );
      })}

      <button
        type="button"
        className="ant-btn"
        onClick={() =>
          append({
            number: "number",
            cityCode: "cityCode",
            countryCode: "countryCode",
          })
        }
      >
        Añadir teléfono
      </button>
    </div>
  );
};

export default NestedPhonesForm;
