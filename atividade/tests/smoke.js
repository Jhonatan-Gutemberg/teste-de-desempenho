import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,         
    duration: '30s', 
    
    thresholds: {
        http_req_failed: ['rate==0'], 
    },
};

export default function () {
    const url = 'http://localhost:3000/health'; 
    const response = http.get(url);

    check(response, {
        'status é 200': (r) => r.status === 200,
    });

    sleep(1); 
}