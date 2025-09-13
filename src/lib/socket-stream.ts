import { Duplex } from "stream";
import { TExtendedSocket } from "../types/socket.types";

function socketStream(socket: TExtendedSocket) {
  const stream = new Duplex({ objectMode: true });
  stream._read = () => {};
  stream._write = (chunk, encoding, callback) => {
    socket.emit("message", chunk);
    callback();
  };

  socket.on("message", (data) => {
    stream.push(data);
  });

  socket.on("disconnect", () => {
    stream.push(null);
    stream.emit("close");
  });

  return stream;
}

export default socketStream;
