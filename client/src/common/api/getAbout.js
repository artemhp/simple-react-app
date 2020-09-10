import config from '../../config';

export default function (state) {
  return fetch(`${config.backend}/assets?content=about`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
}
