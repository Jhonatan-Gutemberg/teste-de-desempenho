import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '10s', target: 300 },
        { duration: '1m', target: 300 },
        { duration: '10s', target: 10 },
    ],
};

export default function () {
    const url = 'http://localhost:3000/checkout/simple'; 
    const payload = JSON.stringify({ item: 'ingresso_vip', quantidade: 2 });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const response = http.post(url, payload, params);

    check(response, {
        'status é 200 ou 201': (r) => r.status === 200 || r.status === 201,
    });
    sleep(0.5); 
}