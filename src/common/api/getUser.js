import config from "../../config";

export default function (id) {
  return fetch(`${config.backend}/item` + id && `/${id}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => res.slice(0, 4));
}
