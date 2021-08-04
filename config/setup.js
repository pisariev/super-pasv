import { config } from 'dotenv';
import supertest from "supertest";
import { start } from './server';

config();

const baseUrl = process.env.BASE_URL;
const port = process.env.PORT;

if (baseUrl.includes('localhost') && baseUrl.includes(port))
    start(port);

before(async function() {
    console.log(`BASE_URL:${process.env.BASE_URL}`);
    console.log(`LOGIN:${process.env.LOGIN}`);
    console.log(`PASSWORD:${process.env.PASSWORD}`);
    await supertest(process.env.BASE_URL)
        .post('/auth')
        .send( { login: process.env.LOGIN, password: process.env.PASSWORD})
        .then((res) => {process.env.TOKEN = res.body.token});
});