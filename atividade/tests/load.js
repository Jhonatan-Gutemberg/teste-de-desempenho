import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 }, 
        { duration: '2m', target: 50 },  
        { duration: '30s', target: 0 },  
    ],
    
    thresholds: {
        http_req_duration: ['p(95)<500'], 
        http_req_failed: ['rate<0.01'],   
    },
};

export default function () {
    const url = 'http://localhost:3000/checkout/simple'; 
    const payload = JSON.stringify({ item: 'produto_promocao', quantidade: 1 });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const response = http.post(url, payload, params);

    check(response, {
        'status é 200 ou 201': (r) => r.status === 200 || r.status === 201,
    });

    sleep(1); 
}