import { faker } from "@faker-js/faker";
import axios from "axios"
import { expect } from "chai";
import dotenv from "dotenv";
import { generateRandomNumber } from "../utils/randomNumber.js";
dotenv.config();


describe("dMoney integration testing", () => {
    let access_token = process.env.access_token;
    let baseUrl = process.env.baseUrl;
    let userId="";
    it("Verify admin can login with correct creds", async () => {
        let { data } = await axios.post(`${baseUrl}/user/login`, {
            email: "admin@dmoney.com",
            password: "1234"
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(data)
        access_token = data.token

    })
    it("Create new customer", async () => {
        let {data}= await axios.post(`${baseUrl}/user/create`, {
            "name": faker.person.fullName(),
            "email":`salmansrabon+${generateRandomNumber(1000,9999)}@gmail.com`,
            "password": "1234",
            "phone_number": `0150${generateRandomNumber(1000000,9999999)}`,
            "nid": "9876543210",
            "role": "Customer"
        },{
            headers:{
                Authorization:`Bearer ${access_token}`,
                "Content-Type":"application/json",
                "X-AUTH-SECRET-KEY":"ROADTOSDET"
            }
        })
        console.log(data)
        userId=data.user.id;

    })
    it("Verify that admin can search with userId", async () => {
        let { data } = await axios.get(`${baseUrl}/user/search/id/${userId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        })
        console.log(data)
        expect(data.message).to.contains("User found")
    })

})