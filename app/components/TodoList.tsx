"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "./Itme";

function TodoList(props: { setData: any; Data: any }) {
  const [edit, setEdit] = useState(false);
  const [ID, setID] = useState();
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const getTodo = async () => {
    const res = await fetch("https://8-8-dars2.vercel.app/api/todos");
    const data = await res.json();

    props.setData(data);
  };

  useEffect(() => {
    getTodo();
    if (edit) {
      setValue(value2);
    }
  }, [edit]);

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!edit) {
      await fetch("https://8-8-dars2.vercel.app/api/todos", {
        method: "POST",
        body: JSON.stringify({
          text: value,
        }),
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
      });
      setValue("");
    } else {
      setValue(value2);

      const res = await fetch("https://8-8-dars2.vercel.app/api/todos/" + ID, {
        method: "PUT",
        body: JSON.stringify({
          text: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setValue("");
      console.log(res);

      setEdit(false);
    }

    getTodo();
  };

  return (
    <div className="max-w-[365px] flex-col gap-6 md:max-w-[500px] mx-auto pt-[10vh] ">
      <form onSubmit={(e) => HandleSubmit(e)}>
        <div className="flex gap-4">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input flex-1  bg-gray-100 input-bordered input-info w-full max-w-xs"
          />

          <Button
            variant="contained"
            color={edit ? "warning" : "primary"}
            href="#contained-buttons"
          >
            {edit ? "edit" : "add"}
          </Button>
        </div>
      </form>
      <div className="flex max-w-full flex-col mt-6">
        {props.Data.map(
          (e: { text: string; complate: boolean; id: number }) => (
            <Item
              EDIT={setEdit}
              value={setValue2}
              setId={setID}
              SetTodo={props.setData}
              key={e.id}
              id={e.id}
              text={e.text}
            />
          )
        )}
      </div>
    </div>
  );
}

export default TodoList;
