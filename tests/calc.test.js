import { expect } from "chai";
import { sub, sum } from "../utils/calc.js"

describe("Calculation Test",()=>{
    it("Verify sum of 2 number",()=>{
        const result=sum(15,5);
        expect(result).to.equal(20)
    })
    it("Verify sub of 2 number",()=>{
        const result=sub(15,5);
        expect(result).to.equal(10)
    })
})