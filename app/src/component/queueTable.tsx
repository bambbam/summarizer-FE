import React from "react";
import { Video } from "../api/video";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface QueueTableProps {
    videos: Video[];
}

const QueueTable = (props: QueueTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>status</TableCell>
                        <TableCell align="right">key</TableCell>
                        <TableCell align="right">url</TableCell>
                        <TableCell align="right">start_time</TableCell>
                        <TableCell align="right">end_time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.videos.map((video) => (
                        <TableRow key={video.key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {video.status}
                            </TableCell>
                            <TableCell align="right">{video.key}</TableCell>
                            <TableCell align="right">{video.url}</TableCell>
                            <TableCell align="right">{video.start_time}</TableCell>
                            <TableCell align="right">{video.end_time ? "" : video.end_time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QueueTable;
