export default function (config, state) {
    return fetch(config.backend, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      }).then(res => res.json())
}