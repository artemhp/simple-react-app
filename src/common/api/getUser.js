import config from "../../config";

export default function (id) {
  let url = `${config.backend}/items`;
  if (id) {
    url = `${url}/${id}`;
  }
  return fetch(url, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      if (!Array.isArray(res)) {
        return res;
      }
      return res.slice(0, 4);
    });
}
