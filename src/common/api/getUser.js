import config from "../../config";

export default function () {
  return fetch(config.backend, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => res.slice(0, 4));
}
