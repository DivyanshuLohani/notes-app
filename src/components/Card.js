import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import timeSince from "../api/utils";
import { CardHeader } from "@mui/material";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function NoteCard(props) {
  const note = props.note;
  const { auth } = useAuth();
  const [loading, setLoading] = React.useState(false);
  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <IconButton
            onClick={async () => {
              setLoading(true);
              try {
                await axios.delete(`/api/notes/note/${note.id}/delete`, {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth.accessToken}`,
                  },
                });
                await props.get_notes();
              } catch (e) {}
              setLoading(false);
            }}
          >
            {!loading ? (
              <DeleteOutlineOutlined />
            ) : (
              <CircularProgress size={24} />
            )}
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2">{note.content}</Typography>
        <Typography sx={{ mb: 1, mt: 2 }} color="text.secondary">
          {timeSince(Date.parse(note.timestamp))}
        </Typography>
      </CardContent>
    </Card>
  );
}
