import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 20 },   // ramp-up
    { duration: '30s', target: 20 },   // load test
    { duration: '10s', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],  // 95% requests < 800ms
    http_req_failed: ['rate<0.01'],    // error rate < 1%
  },
};

export default function () {
  let res = http.get('https://dominos.vn');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
