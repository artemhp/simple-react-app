import config from '../../config';

export default function (state) {
  return fetch(`${config.backend}/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state),
  }).then(res => res.json());
}
