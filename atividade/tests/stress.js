import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 200 },  
        { duration: '2m', target: 500 },  
        { duration: '2m', target: 1000 }, 
    ],
};

export default function () {
    const url = 'http://localhost:3000/checkout/crypto'; 
    const payload = JSON.stringify({});
    const params = { headers: { 'Content-Type': 'application/json' } };

    const response = http.post(url, payload, params);

    check(response, {
        'status é 201': (r) => r.status === 201,
    });
    
    sleep(1); 
}