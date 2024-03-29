"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Divider } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function Item(props: {
  text: string;
  complate?: boolean;
  id: number;
  SetTodo: any;
  setId: any;
  value: any;
  EDIT: any;
}) {
  const [checked, setChecked] = React.useState([0]);

  const getTodo = async () => {
    const res = await fetch("https://8-8-dars2.vercel.app/api/todos");
    const data = await res.json();

    props.SetTodo(data);
  };

  const handleEdit = () => {
    props.EDIT(true);
    props.value(props.text);
    props.setId(props.id);
  };
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleDelate = async (idd: number) => {
    const res = await fetch("https://8-8-dars2.vercel.app/api/todos/" + idd, {
      method: "DELETE",
    });
    getTodo();
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {[0].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton
                color="error"
                onClick={() => handleDelate(props.id)}
                edge="end"
                aria-label="comments"
              >
                <DeleteForeverIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={props.text} />
            </ListItemButton>
          </ListItem>
        );
      })}
      <button className=" absolute top-3 right-12">
        <IconButton onClick={handleEdit} color="warning">
          <ModeEditIcon />
        </IconButton>
      </button>
      <Divider />
    </List>
  );
}
